"use client";

export default function EmojiPicker({ onSelect }) {
  const emojis = ["😀", "😂", "😍", "🥳", "😎", "😢", "😡", "👍", "🙏", "🔥", "❤️", "🎉"];

  return (
    <div className="emoji-picker">
      {emojis.map((emoji) => (
        <span key={emoji} className="emoji" onClick={() => onSelect(emoji)}>
          {emoji}
        </span>
      ))}
    </div>
  );
}
