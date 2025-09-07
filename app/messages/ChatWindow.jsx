"use client";
import { useState, useEffect, useRef } from "react";
import { BsFillMicFill, BsFillEmojiSmileFill, BsFillFileEarmarkArrowUpFill, BsCheck2All } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

export default function ChatWindow({ selectedUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);

  // Fetch messages from MongoDB when a user is selected
  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/messages?sender=khushal07&receiver=${selectedUser}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setMessages(data.messages);
        })
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUser]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Sending Messages
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: "khushal07",
      receiver: selectedUser,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        setMessages((prev) => [...prev, { ...messageData, status: "sent" }]);
        socket.emit("sendMessage", messageData);
        setNewMessage(""); // Clear input field
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle File Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sender", "khushal07");
    formData.append("receiver", selectedUser);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Add uploaded file as a message
        setMessages((prev) => [
          ...prev,
          { sender: "khushal07", receiver: selectedUser, fileUrl: data.fileUrl, timestamp: new Date().toISOString() },
        ]);
      } else {
        console.error("Failed to upload file:", data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{selectedUser || "Select a Chat"}</h3>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "khushal07" ? "sent" : "received"}`}>
            {msg.fileUrl ? (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                📎 File Attachment
              </a>
            ) : (
              <p>{msg.message}</p>
            )}
            <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            {msg.sender === "khushal07" && <BsCheck2All className={`message-status ${msg.status}`} />}
          </div>
        ))}
        <div ref={chatContainerRef}></div>
      </div>

      <div className="chat-input">
        {/* Emoji Picker */}
        {showEmojiPicker && <EmojiPicker onEmojiClick={(emoji) => setNewMessage((prev) => prev + emoji.emoji)} />}
        
        <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <BsFillEmojiSmileFill />
        </button>

        {/* Input Field with Enter Key Support */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
          placeholder="Type a message..."
          className="chat-input-field"
        />

        {/* File Upload Input */}
        <input type="file" id="fileInput" hidden onChange={handleFileUpload} />
        <button className="file-button" onClick={() => document.getElementById("fileInput").click()}>
          <BsFillFileEarmarkArrowUpFill />
        </button>

        {/* Send Button */}
        <button className="send-button" onClick={sendMessage}>
          ➤
        </button>

        {/* Mic Button */}
        <button className="mic-button">
          <BsFillMicFill />
        </button>
      </div>
    </div>
  );
}
