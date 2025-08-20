"use client";

import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function VerifyEmail() {
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email resent! Please check your inbox.");
    } else {
      setMessage("No user logged in to resend verification.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Verify Your Email</h1>
      <p>We've sent a verification link to your email. Please check your inbox.</p>
      <button onClick={handleResend}>Resend Verification Email</button>
      {message && <p>{message}</p>}
    </div>
  );
}
