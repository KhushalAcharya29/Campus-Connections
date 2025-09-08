"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatBox = ({ currentUser, selectedUser }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  // Initialize socket connection once
  useEffect(() => {
    const newSocket = io(); // Connect to backend
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Listen for messages and typing events
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleTyping = ({ sender }) => {
      if (sender !== currentUser?._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("displayTyping", handleTyping);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("displayTyping", handleTyping);
    };
  }, [socket, currentUser?._id]);

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser || !selectedUser) return;

    const messageData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content: newMessage,
      seen: false,
      id: Date.now().toString(), // unique id for React key
    };

    socket?.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  const handleTyping = () => {
    if (!currentUser) return;
    socket?.emit("typing", { sender: currentUser._id });
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === currentUser?._id ? "sent" : "received"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {typing && <div className="typing-animation">Typing...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleTyping} // updated from onKeyPress
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
