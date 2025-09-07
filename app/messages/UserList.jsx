"use client";

import { useState } from "react";

export default function UserList({ onSelectChat, selectedChat }) {
  const [search, setSearch] = useState("");
  const chatUsers = [
    { username: "khushal07", avatar: "/user8.jpg", lastMessage: "Hey there!" },
    { username: "friend_01", avatar: "/user7.jpg", lastMessage: "See you soon!" },
    { username: "friend_02", avatar: "/user1.jpg", lastMessage: "Let's meet at 6PM!" }
  ];

  const filteredChats = chatUsers.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-list">
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredChats.map((user) => (
        <div
          key={user.username}
          className={`chat-item ${selectedChat === user.username ? "active" : ""}`}
          onClick={() => onSelectChat(user.username)} // ✅ Function name now matches
        >
          <img src={user.avatar} alt="Avatar" className="chat-avatar" />
          <div>
            <div className="chat-name">{user.username}</div>
            <div className="chat-last-message">{user.lastMessage}</div>
          </div>
        </div>
      ))}
      <div className="user-profile">
        <img src="/user9.jpg" alt="My Profile" className="profile-avatar" />
        <div>khushal07</div>
      </div>
    </div>
  );
}
