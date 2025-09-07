"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import "./styles.css"; // Your custom CSS

const socket = io("http://localhost:3001");

export default function ChatHere() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState("khushal07");
  const [selectedChat, setSelectedChat] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true); // Overlay initially shown

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowOverlay(false), 10000); 
  //   return () => clearTimeout(timer);
  // }, []);
  

  return (
    <div className="relative">
      {/* Overlay Message */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/60 z-50 flex items-center justify-center backdrop-blur-sm">

          <div className="bg-white rounded-2xl p-6 max-w-md mx-auto text-center shadow-xl animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Feature Notice 🚧
            </h2>
            <p className="text-gray-600 mb-6">
              For now, <strong>only self-chat is available</strong>. One-to-one conversations will be available soon once the Socket.IO integration is fully functional. Thank you for your patience and understanding!
            </p>
            <button
              onClick={() => setShowOverlay(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Blurred background content when overlay is active */}
      <div className={`chat-container ${showOverlay ? "blur-sm pointer-events-none" : ""}`}>
        <UserList onSelectChat={setSelectedChat} selectedChat={selectedChat} />

        {selectedChat ? (
          <ChatWindow selectedUser={selectedChat} socket={socket} />
        ) : (
          <div className="chat-placeholder">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
}
