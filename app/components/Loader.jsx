"use client";
import "@/app/styles/Loader.css";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <Image
          src="/vertical-logo.png"
          width={60}             // <- numeric, not "60px"
          height={60}            // <- required
          alt="Connect logo"
          className="loader-logo"
          priority
        />
        <div className="loader-bar">
          <div className="loader-bar-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
