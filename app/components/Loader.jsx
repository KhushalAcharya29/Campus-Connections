"use client";
import "@/app/styles/Loader.css";
import Image from 'next/image';
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <Image
          src="/vertical-logo.png"
          width="60px"
          alt="Connect..."
          className="loader-logo"
        />
        <div className="loader-bar">
          <div className="loader-bar-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
