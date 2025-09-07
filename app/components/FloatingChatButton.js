"use client";

import { useRouter } from "next/navigation";

export default function FloatingChatButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/messages")}
      className="fixed bottom-36 right-16 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
    >
      💬 Chat
    </button>
  );
}
