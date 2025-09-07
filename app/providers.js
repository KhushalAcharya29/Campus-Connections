// app/providers.js
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { io } from "socket.io-client";

export default function Providers({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const socket = io();
    console.log("Socket connected");
    return () => socket.disconnect();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
