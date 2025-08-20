"use client";
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function PhoneLogin() {
    const [phone, setPhone] = useState("");
    const [otp, setOTP] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const router = useRouter();

    const generateRecaptcha = () => {
        if (typeof window !== "undefined" && !window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,                
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: () => console.log("reCAPTCHA solved"),
                }
            );
        }
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            generateRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(result);
        } catch (err) {
            console.error("OTP error", err);
            alert(err.message);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!confirmationResult) return;
        try {
            const result = await confirmationResult.confirm(otp);
            console.log("User logged in:", result.user);
            router.push("/dashboard");
        } catch (err) {
            alert("Invalid OTP");
        }
    };

    return (
        <div>
            <form onSubmit={handleSendOTP}>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone (+911234567890)"
                    required
                />
                <button type="submit">Send OTP</button>
            </form>

            {/* recaptcha container must be here */}
            <div id="recaptcha-container"></div>

            {confirmationResult && (
                <form onSubmit={handleVerifyOTP}>
                    <input
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="OTP"
                        required
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
        </div>
    );
}