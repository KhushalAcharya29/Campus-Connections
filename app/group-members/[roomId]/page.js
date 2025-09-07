"use client";
import { useEffect, useState } from "react";

const GroupMembersPage = ({ params }) => {
  const { roomId } = params;
  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/rooms/${roomId}/members`);
        const data = await response.json();
        console.log("Fetched members:", data.members); // Debugging
        setMembers(data.members || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [roomId]);

  // Handle sending messages
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "khushal07", text: newMessage, timestamp: new Date().toLocaleTimeString() }
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <div className="p-4 bg-blue-600 text-white shadow-md flex items-center justify-between">
        <h2 className="text-xl font-semibold">Group Chat</h2>
        <span className="text-sm opacity-80">{members.length} members</span>
      </div>

      {/* Group Members Section */}
      <div className="bg-white p-4 shadow-md border-b">
        <h3 className="text-lg font-semibold">Group Members</h3>
        <div className="mt-2 flex space-x-3 overflow-x-auto">
          {members.length > 0 ? (
            members.map((member, index) => (
              <div key={index} className="bg-gray-200 p-2 px-4 rounded-lg shadow-sm text-sm">
                {member}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No members yet.</p>
          )}
        </div>
      </div>

      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-xs ${
                msg.sender === "khushal07"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-300 text-black"
              }`}
            >
              <strong>{msg.sender}:</strong>
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-70 block text-right">{msg.timestamp}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white shadow-md flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupMembersPage;
