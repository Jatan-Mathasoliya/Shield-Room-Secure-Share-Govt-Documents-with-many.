import { User } from '../models/user.model.js';
import { OTP } from '../models/otp.model.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { response } from 'express';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config();

const maxAge = 1 * 60 * 60; // 1 hour

export const sendSignupOTP = async (req, res) => {
    const { email, username, password, rePassword } = req.body;

    if (!email || !password || !username || !rePassword) {
        return res.status(400).json({ message: "Email, Password, Username and Re-Password are required" });
    }

    if (password !== rePassword) {
        return res.status(400).json({ message: "Password and Re-Entered Password do not match" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already registered" });
    }

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    await OTP.findOneAndUpdate(
        { email },
        { otp: otpCode, expiresAt },
        { upsert: true }
    );

    await sendEmail(
        email,
        "Welcome to ShieldRoom 🚀",
        `Your Signup OTP is ${otpCode}. It expires in 2 minutes.`
    );

    res.json({ message: "OTP sent" });
};

export const verifySignupOTP = async (req, res) => {
    const { email, username, otp, password } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }

    const record = await OTP.findOne({ email });

    if (!record) {
        return res.status(400).json({ message: "OTP not found" });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        email,
        password: hashedPassword,
        isVerified: true
    });

    await user.save();

    await OTP.deleteOne({ email });

    res.json({ message: "Signup successful" });
};

export const sendLoginOTP = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 60 * 1000);

    await OTP.findOneAndUpdate(
        { email },
        { otp: otpCode, expiresAt },
        { upsert: true }
    );

    await sendEmail(
        email,
        "Your Login OTP Code for ShieldRoom Account Login",
        `Your OTP is ${otpCode}. Valid for 1 minute.`
    );

    res.json({ message: "OTP sent" });
};

export const verifyLoginOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const record = await OTP.findOne({ email });

    if (!record) {
        return res.status(400).json({ message: "OTP not found" });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    await OTP.deleteOne({ email });

    // Issue JWT token
    const token = jwt.sign(
        { email, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: maxAge }
    );

    res.cookie("jwt", token, {
        maxAge,
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    res.json({ message: "Login successful" });
};


export const reSendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 60 * 1000); // 1 minute

    await OTP.findOneAndUpdate(
        { email },
        { otp: otpCode, expiresAt },
        { upsert: true }
    );

    await sendEmail(
        email,
        "Your OTP Code for ShieldRoom",
        `Your OTP is ${otpCode}. It expires in 1 minute.`
    );

    res.json({ message: "OTP resent" });
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const resetToken = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        const resetLink = `http://localhost:5173/auth/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request - ShieldRoom account",
            html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
        })

        res.status(200).json({ message: "Password reset Link sent to " + user.email })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { newPassword, reNewPassword } = req.body;

        if (!newPassword || !reNewPassword) {
            return res.status(400).json({ message: "New Password and Re-Entered New Password are required" });
        }

        if (newPassword !== reNewPassword) {
            return res.status(400).json({ message: "New Password and Re-Entered New Password do not match" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ message: err.message });
    }
}

export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
        res.status(200).send("LogOut Successful.");
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server error");
    }
};