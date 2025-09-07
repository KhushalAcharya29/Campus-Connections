"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(); // Connect to the backend

const ChatBox = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("displayTyping", ({ sender }) => {
      setTyping(sender !== currentUser?._id);
      setTimeout(() => setTyping(false), 2000);
    });

    return () => socket.off();
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const messageData = {
      sender: currentUser?._id,
      receiver: selectedUser?._id,
      content: newMessage,
      seen: false,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", { sender: currentUser?._id });
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser?._id ? "sent" : "received"}`}>
            {msg.content}
          </div>
        ))}
        {typing && <div className="typing-animation">...</div>}
      </div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleTyping}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
