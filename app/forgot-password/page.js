"use client";

import { useState } from "react";
import "@/app/styles/Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (email.endsWith("@ratnamcollege.edu.in")) {
      setMessage(
        "⚠️ This action is restricted for '@ratnamcollege.edu.in' email addresses."
      );
      setIsSuccess(false);
      setShowDetails(true);
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ A reset link has been sent to your email.");
        setIsSuccess(true);
        setShowDetails(false);
      } else {
        setMessage("❌ Error: " + data.message);
        setIsSuccess(false);
        setShowDetails(false);
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
      setIsSuccess(false);
      setShowDetails(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Reset Your Password
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your college email to receive a password reset link.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="you@ratnamcollege.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md text-sm transition-all duration-300 ease-in-out ${
              isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
            }`}
          >
            <p>{message}</p>

            {/* Expandable Details */}
            {showDetails && (
              <div className="mt-2 text-sm text-gray-700 bg-red-50 border-l-4 border-red-400 p-3 rounded">
                <p>
                  For security reasons and policy compliance, email addresses
                  ending with <strong>@ratnamcollege.edu.in</strong> are
                  restricted from performing password reset operations through
                  this platform.
                </p>
                <p className="mt-2">
                  Please contact the college administration directly if you need
                  assistance with your account or credentials.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:underline text-sm">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
