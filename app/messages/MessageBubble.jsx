"use client";

export default function MessageBubble({ message }) {
  const isSelf = message.sender === "myself";

  return (
    <div className={`message-bubble ${isSelf ? "sent" : "received"}`}>
      <p>{message.content}</p>
      <span className="timestamp">
        {new Date(message.timestamp).toLocaleTimeString()} 
        {isSelf && (message.status === "seen" ? " ✅✅" : " ✅")}
      </span>
    </div>
  );
}
