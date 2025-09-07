"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff } from "lucide-react";

const GlobalSpeechAssistant = () => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setMessage("Listening...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setMessage(`You said: "${transcript}"`);
    
      if (transcript.includes("hello") || transcript.includes("hi")) {
        speak("Hello Ma'am, welcome to Campus Connections — a student-exclusive platform designed to connect, collaborate, and grow together. I'm here to guide you through every feature. Just say what you’d like to do, and I’ll assist you instantly.");
      }else if (transcript.includes("login")) {
        speak("Okay, let me open the login page for you.");
        router.push("/login");
      } else if (transcript.includes("khushal") || transcript.includes("made")) {
        speak("oh hello khushal! I listen to you everyday! give others to try me! we are the daily communicators!");
      }  else if (transcript.includes("sign up") || transcript.includes("register")) {
        speak("Ohh, so you are a new user at Campus Connections. Let’s create your account.");
        router.push("/signup");
      }  else if (transcript.includes("manual") || transcript.includes("form")) {
        speak("Ohh, so you want to signup manually. Let’s create your account.");
        router.push("/signup/manual");
      }  else if (transcript.includes("scan") || transcript.includes("id card")) {
        speak("Ohh, so you want to signup using your ID card. Let’s create your account.");
        router.push("/signup/scan");
      } else if (transcript.includes("home page") || transcript.includes("starting")) {
        speak("Alright, let me take you to the home page. But ensure you are logged in.");
        router.push("/home");
      } else if (transcript.includes("apartment")) {
        speak("Here are the available apartments for you.");
        router.push("/apartments");
      } else if (transcript.includes("room") || transcript.includes("group")) {
        speak("Great! Let me take you to the group chat room.");
        router.push("/rooms");
      } else if (transcript.includes("chat") || transcript.includes("message")) {
        speak("Alright, let me take you to the chat page.");
        router.push("/messages");
      } else if (transcript.includes("who are you") || transcript.includes("what can you do")) {
        speak("I’m your Campus Connections Assistant, here to help you navigate, explore features, and answer anything about your student network.");
      }  else if (transcript.includes("start") || transcript.includes("initial")) {
        speak("Sure! Let me take you to the starting page.");
        router.push("/");
      }  else if (transcript.includes("teacher") || transcript.includes("class mam")) {
        speak("oh hello Urshita mam, khushal told me you teach power b i, tell me or khushal if you want some help!");
      }  else if (transcript.includes("vinita") || transcript.includes("hod")) {
        speak("oh hello Vinita mam, khushal told me you manage the department, but I don't know what you teach, well how can I help you?");
      } else {
        speak("Sorry, I didn't understand that. Please try again.");
      }
    };

    recognition.onerror = (event) => {
      setMessage("Error occurred: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-20 right-6 z-[9999]"> {/* changed from bottom-6 to bottom-20 */}
  <button
    onClick={handleSpeechRecognition}
    className={`rounded-full bg-blue-600 hover:bg-blue-700 p-4 shadow-lg transition transform ${
      listening ? "animate-pulse scale-105" : "hover:scale-110"
    }`}
    title="Speak"
  >
    {listening ? (
      <Mic className="text-white w-6 h-6" />
    ) : (
      <MicOff className="text-white w-6 h-6" />
    )}
  </button>
</div>

  );
};

export default GlobalSpeechAssistant;