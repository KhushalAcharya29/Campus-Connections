"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginLoader from "@/app/components/LoginLoader";
import "@/app/styles/Login.css"; // External CSS
import Image from 'next/image';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/home"); // Redirect to home page
        // ✅ Save username in localStorage
      localStorage.setItem("username", data.username);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide loader after login attempt
    }
  };

  return (
    <div className="login-container">
      {/* Left Section (Login Form) */}
      <div className="login-box">
        {loading && <LoginLoader />} {/* Loader when logging in */}
        
        <h1>Welcome back</h1>
        <p>Don&apos;t have an account? <a href="/signup">Create your profile</a></p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="/forgot-password" className="forgot-password">Forgot password?</a>


          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging You In..." : "Login"}
          </button>
        </form>
      </div>

      {/* Right Section (Animated Profile Circles) */}
      
      <div className="right-section">
              <div className="profile-circles">
                <Image src="user1.jpg" alt="User 1" className="circle c1" />
                <Image src="user2.jpeg" alt="User 1" className="circle c7" />
                <Image src="user3.jpg" alt="User 1" className="circle c8" />
                <Image src="user4.png" alt="User 1" className="circle c9" />
                <Image src="user5.jpg" alt="User 2" className="circle c2" />
                <Image src="user6.jpg" alt="User 3" className="circle c3" />
                <Image src="user7.jpg" alt="User 4" className="circle c4" />
                <Image src="user8.jpg" alt="User 5" className="circle c5" />
                <Image src="user9.jpg" alt="User 6" className="circle c6" />
                <Image src="user10.jpg" alt="User 6" className="circle c10" />
              </div>
            </div>
      
    </div>
  );
}
