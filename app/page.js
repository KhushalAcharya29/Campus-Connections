"use client";

import { useState, useEffect } from "react";
import Loader from "@/app/components/Loader";
import SpeakOnLoad from "@/app/components/SpeakOnLoad";
import SpeechRecognitionComponent from "@/app/components/SpeechRecognitionComponent";
import "@/app/styles/HomePage.css"; // Ensure this CSS file exists
import toast from "react-hot-toast"; // Importing toast library
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [showIntro, setShowIntro] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

 // Function to handle email submission
 const handleGetStarted = () => {
  if (!email) {
    toast.error("❌ Please enter your college email!", { duration: 3000 }); 
    return;
  }

  if (!email.endsWith("@ratnamcollege.edu.in")) {
    toast.error("⚠️ Invalid email! Use your college email.", { duration: 3000 });
    return;
  }

  // Show success toast
  toast.success("📩 Email sent successfully! You will be notified when the website opens.", { duration: 3000 });
  setEmail(""); // Clear input field after submission
 };

 useEffect(() => {
  const loaderTimer = setTimeout(() => {
    setLoading(false);
    setShowIntro(true);

    // Auto-close intro after 4 seconds
    setTimeout(() => {
      setShowIntro(false);
    }, 10000); // ← You can increase/decrease this duration
  }, 2000);

  return () => clearTimeout(loaderTimer);
}, []);
useEffect(() => {
  const consent = localStorage.getItem("cookieConsents");
  if (!consent) {
    setShowCookieBanner(true);
  }
}, []);

const handleCookieChoice = (choice) => {
  localStorage.setItem("cookieConsent", choice);
  setShowCookieBanner(false);
};

  return (
    
    <div>
      {loading ? (
        <Loader /> // Show the loader when `loading` is true
      ) : (
        <>
         
         {showIntro && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="fixed bottom-20 right-6 z-50 text-white text-left max-w-xs"
  >
    <div className="relative bg-black/60 backdrop-blur-sm p-4 rounded-xl shadow-lg">
      {/* Arrow */}
      <div className="absolute bottom-[-20px] right-4 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-black/60" />

      <h2 className="text-xl font-bold">🎙️ Voice Assistant</h2>
      <p className="text-sm">
        You can now use your voice to navigate. Try saying:
      </p>
      <ul className="text-sm mt-2 list-disc pl-4">
  <li>&quot;start with hello or who or you?&quot;</li>
  <li>&quot;I want to Login&quot;</li>
  <li>&quot;I am new user, want to Signup!&quot;</li>
  <li>&quot;Open my profile&quot;</li>
</ul>
    </div>
  </motion.div>
)}

          <SpeakOnLoad text="Welcome to Campus Connections. Enjoy a seamless experience connecting with your campus community." />
          {/* Main Hero Section */}
          <div className="homepage-container">
            <div className="left-section">
              <h2>ⓒⓒ Campus Connection</h2>
            <h6>A Better Era of Personalized Networking</h6>
              <h1>Bringing It Back to the Students</h1>
              <p>
                Campus Connections is a student networking platform that
                prioritizes engagement, collaboration, and meaningful
                connections.
              </p>
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Your college email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Updating state
                />
                <button onClick={handleGetStarted}>Get Started</button> {/* Click triggers toast */}
              </div>
              <p>
                Already have an account? <a href="/login">Sign in here</a>
              </p>
              <p>New user? <a href="/signup">Create an account</a></p>
            </div>

            {/* Animated Profile Circles */}
            <div className="right-section">
              <div className="profile-circles">
  <Image src="/user1.jpg" alt="User 1" className="circle c1" width={100} height={100} />
  <Image src="/user2.jpeg" alt="User 2" className="circle c7" width={100} height={100} />
  <Image src="/user3.jpg" alt="User 3" className="circle c8" width={100} height={100} />
  <Image src="/user4.png" alt="User 4" className="circle c9" width={100} height={100} />
  <Image src="/user5.jpg" alt="User 5" className="circle c2" width={100} height={100} />
  <Image src="/user6.jpg" alt="User 6" className="circle c3" width={100} height={100} />
  <Image src="/user7.jpg" alt="User 7" className="circle c4" width={100} height={100} />
  <Image src="/user8.jpg" alt="User 8" className="circle c5" width={100} height={100} />
  <Image src="/user9.jpg" alt="User 9" className="circle c6" width={100} height={100} />
  <Image src="/user10.jpg" alt="User 10" className="circle c10" width={100} height={100} />
</div>

            </div>
          </div>

          {/* Features Section */}
          <div className="features-container">
            <div className="feature-card">
              <h3>🎓 Students First</h3>
              <p>Campus Connections prioritizes students over profits. Our platform is built for genuine networking, not algorithms.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 We Never Sell Your Data</h3>
              <p>Your personal data stays secure with us. We don&apos;t share or sell your information—your privacy matters.</p>
            </div>
            <div className="feature-card">
              <h3>🚫 No Ads, No Distractions</h3>
              <p>Our platform is designed to be distraction-free. No unnecessary ads—just meaningful student interactions.</p>
            </div>
            <div className="feature-card">
              <h3>🤝 A Friendly Student Space</h3>
              <p>We encourage collaboration, not toxicity. Connect, learn, and grow in a safe student-focused environment.</p>
            </div>
          </div>

          {/* Speech Feature Explanation Section */}
          <div className="speech-feature-container">
            <h2>🔊 Speak with Campus Connections</h2>

            {/* Video Space for Animated Speaking Button */}
            <div className="video-container">
              <video controls muted loop>
                <source src="video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Speech Feature Description */}
            <div className="speech-text-box">
              <p>
                🎤 Now, you can interact with <strong>Campus Connections</strong> using just your voice.
                Click the microphone button and say commands like:
              </p>
              <p className="speech-examples">
                <strong>&quot;Login&quot;</strong> | <strong>&quot;Sign Up&quot;</strong> | <strong>&quot;Open my profile&quot;</strong>
              </p>
              <p>
  You can also speak naturally, like <i>&quot;Hey, I want to create an account.&quot;</i>
  or <i>&quot;Open the login page for me.&quot;</i>, and the system will respond smartly.
</p>
              <p>Enjoy a hands-free, smooth user experience! 🚀</p>
            </div>
          </div>
        </>
      )}

{showCookieBanner && (
  <div className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 z-[9999] bg-white border border-gray-300 shadow-xl rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn transition-all duration-300">
    <div className="flex items-start gap-3 text-sm sm:text-base text-gray-800">
      <span className="text-2xl">🍪</span>
      <div>
        <strong className="font-semibold">We value your privacy</strong>
        <p className="text-gray-600 mt-1">
          We use cookies to personalize content and enhance your experience. By accepting, you consent to our cookie policy.
        </p>
      </div>
    </div>

    <div className="flex gap-2 shrink-0">
      <button
        onClick={() => handleCookieChoice("accepted")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        Accept
      </button>
      <button
        onClick={() => handleCookieChoice("declined")}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        Decline
      </button>
    </div>
  </div>
)}
    </div>
  );
}