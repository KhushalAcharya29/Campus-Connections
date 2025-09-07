"use client";
import { useState, useEffect } from "react";

const reactions = [
  { emoji: "👍 Like", name: "Like" },
  { emoji: "❤️ Love", name: "Love" },
  { emoji: "😂 Funny", name: "Haha" },
  { emoji: "😮 Wow", name: "Wow" },
  { emoji: "😢 Sad", name: "Sad" },
  { emoji: "😡 Angry", name: "Angry" },
];

const LikeButton = ({ postId }) => {
  const [selectedReaction, setSelectedReaction] = useState("👍");
  const [likeCount, setLikeCount] = useState(0);
  const [showReactions, setShowReactions] = useState(false);

  useEffect(() => {
    // Fetch initial like count & reaction
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}/like`);
        if (res.ok) {
          const data = await res.json();
          setSelectedReaction(data.reaction || "👍");
          setLikeCount(data.count || 0);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [postId]);

  const handleReactionClick = async (reaction) => {
    setSelectedReaction(reaction.emoji);
    setShowReactions(false);

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: reaction.emoji }),
      });
      if (res.ok) {
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Like Button */}
      <button
        onMouseEnter={() => setShowReactions(true)}
        className="p-2 text-lg bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        {selectedReaction} 
      </button>

      {/* Reaction Box */}
      {showReactions && (
        <div
          className="absolute bg-white shadow-lg flex space-x-2 p-2 rounded-lg top-10 left-0"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          {reactions.map((reaction) => (
            <button
              key={reaction.name}
              onClick={() => handleReactionClick(reaction)}
              className="text-2xl hover:scale-125 transition"
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikeButton;
