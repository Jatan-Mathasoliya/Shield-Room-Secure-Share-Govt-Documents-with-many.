import { User } from '../models/user.model.js';
import { OTP } from '../models/otp.model.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { response } from 'express';
import dotenv from 'dotenv'

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
    const expiresAt = new Date(Date.now() + 60 * 1000); // 1 minute

    await OTP.findOneAndUpdate(
        { email },
        { otp: otpCode, expiresAt },
        { upsert: true }
    );

    await sendEmail(
        email,
        "Welcome to ShieldRoom 🚀",
        `Your Signup OTP is ${otpCode}. It expires in 1 minute.`
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
    const { email, password, otp } = req.body;

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

    res.json({ message: "Login successful", token });
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