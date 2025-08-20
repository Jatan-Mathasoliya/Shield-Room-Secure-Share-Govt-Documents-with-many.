"use client";
import { useAuth } from "../context/AuthProvider";
import PhoneLogin from "./phonelogin"

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => loginWithGoogle()}>Sign in with Google</button>
      <hr />
      <PhoneLogin />
    </div>
  );
}
