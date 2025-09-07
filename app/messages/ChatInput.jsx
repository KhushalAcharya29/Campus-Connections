"use client";

import { useState } from "react";
import EmojiPicker from "./EmojiPicker";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-input">
      {/* Emoji Button */}
      <button className="emoji-button" onClick={() => setShowEmojis(!showEmojis)}>😀</button>

      {/* Emoji Picker */}
      {showEmojis && <EmojiPicker onSelect={(emoji) => setMessage((prev) => prev + emoji)} />}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>➤</button>
      <button className="mic-button">🎤</button>
    </div>
  );
}
