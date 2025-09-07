"use client";

import { useState } from "react";
import "@/app/styles/SpeakButton.css";

const SpeakButton = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Optionally, you can set voice, rate, pitch, etc.
      // utterance.voice = speechSynthesis.getVoices()[0];
      // utterance.rate = 1;
      // utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <button
      className="speak-btn"
      onClick={speakText}
      disabled={isSpeaking}
    >
      {isSpeaking ? "Speaking..." : "Speak"}
    </button>
  );
};

export default SpeakButton;
