"use client"
import { useState } from "react";

export default function RecoverPassword({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending reset email...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/patients/send-password-reset-email`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});
    if (res.ok) {
      setMessage("Check your email for a reset link.");
    } else {
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center">
      <h2 className="mb-4 font-bold text-lg">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-[var(--turquoise)] text-white px-4 py-2 rounded w-full">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
      <button
        className="mt-4 underline text-[var(--turquoise)]"
        onClick={() => onSwitch("login")}
      >
        Back to Login
      </button>
    </div>
  );
}