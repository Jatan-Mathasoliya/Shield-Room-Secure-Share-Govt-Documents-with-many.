"use client";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.displayName || user.phoneNumber}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
