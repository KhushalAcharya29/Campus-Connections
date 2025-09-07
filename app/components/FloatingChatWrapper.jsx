"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";
import FloatingChatButton from "./FloatingChatButton";

export default function FloatingChatWrapper() {
  const pathname = usePathname();

  

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (pathname === "/home") {
    return <FloatingChatButton />;
  }

  return null;
}
