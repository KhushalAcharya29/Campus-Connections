// app/feed/page.js
import Image from "next/image";
import { Lock } from "lucide-react";

export default function FeedPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Blurred Background Image */}
      <Image
        src="/feed-blur.png"
        alt="Feed Background"
        fill
        className="object-cover filter blur-md brightness-50"
        priority
      />

      {/* Lock and Message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
        <Lock className="w-12 h-12 mb-4 text-white animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-semibold">
          This section is locked
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          The Feed page will be available soon!
        </p>
      </div>
    </div>
  );
}
