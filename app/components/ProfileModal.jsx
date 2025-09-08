"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // ⬅️ Import useRouter
import Image from 'next/image';
export default function ProfileModal({ isOpen, onClose, user, onSignOut }) {
  const modalRef = useRef(null);
  const router = useRouter(); // ⬅️ Init router

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="absolute right-2 top-14 w-80 bg-white shadow-xl rounded-lg p-4 z-50">
      {/* Profile Section */}
      <div className="flex items-center space-x-3">
        <Image
  src="/logo.jpg"
  alt="Profile"
  width={48}   // w-12 = 48px
  height={48}  // h-12 = 48px
  className="rounded-full"
  priority     // optional: ensures fast loading for profile/logo
/>

        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Manage Account Button */}
      <button
  onClick={() => {
    localStorage.setItem("username", user.username); // ✅ Store username
    router.push("/profile"); // ➡️ Redirect
  }}
  className="mt-2 w-full py-1 bg-blue-500 text-white rounded-lg"
>
  Manage Your Account
</button>


      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        className="mt-3 w-full py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200"
      >
        Sign out
      </button>
    </div>
  );
}
