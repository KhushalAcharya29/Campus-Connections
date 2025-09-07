"use client";

import { useEffect, useState } from "react";

const SpeakOnLoad = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.rate = 1;
      newUtterance.pitch = 1;
      setUtterance(newUtterance);

      // Try speaking after 2 seconds
      const startSpeaking = () => {
        if (!isSpeaking && !speechSynthesis.speaking) {
          speechSynthesis.speak(newUtterance);
          setIsSpeaking(true);
        }
      };

      // ✅ Ensuring speech starts properly
      setTimeout(() => {
        startSpeaking();
      }, 2000);

      // ✅ Handling browsers that need interaction
      document.addEventListener("click", startSpeaking, { once: true });
    }
  }, [text]);

  // Stop speaking function
  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="speak-container">
      {isSpeaking && (
        <button onClick={stopSpeaking} className="stop-speak-button">
          Stop Speaking
        </button>
      )}
    </div>
  );
};

export default SpeakOnLoad;
