"use client";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="relative h-screen flex justify-center items-center overflow-hidden">
      {/* Blurred background */}
      <Image
  src="/job-blur.png"
  alt="Feed Background"
  fill
  className="object-cover filter blur-sm brightness-50"
  priority
/>

      
      {/* Locked overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
        <Lock className="w-12 h-12 mb-4 text-white animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-semibold">
        🔒 Jobs Locked
        </h1>
        <p className="mt-2 text-lg text-gray-300">
        This feature is currently under development.
        </p>
      </div>
    </div>
  );
}
