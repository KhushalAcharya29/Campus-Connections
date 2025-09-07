"use client";
import "@/app/styles/LoginLoader.css"; // Ensure you create this CSS file

const LoginLoader = () => {
  return (
    <div className="login-loader-container">
      <div className="spinner"></div>
      <p>Logging You In...</p>
    </div>
  );
};

export default LoginLoader;
