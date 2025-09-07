// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const SpeechRecognitionComponent = () => {
//   const [listening, setListening] = useState(false);
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleSpeechRecognition = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setListening(true);
//       setMessage("Listening...");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toLowerCase();
//       setMessage(`You said: "${transcript}"`);
    
//       if (transcript.includes("hello") || transcript.includes("hi")) {
//         speak("Hello Ma'am, welcome to Campus Connections — a student-exclusive platform designed to connect, collaborate, and grow together. I'm here to guide you through every feature. Just say what you’d like to do, and I’ll assist you instantly.");
//       }
//       else if (transcript.includes("login")) {
//         speak("Okay, let me open the login page for you.");
//         router.push("/login");
//       } else if (transcript.includes("sign up") || transcript.includes("register")) {
//         speak("Ohh, so you are a new user at Campus Connections. Let’s create your account.");
//         router.push("/signup");
//       } else if (transcript.includes("homepage") || transcript.includes("home")) {
//         speak("Alright, let me take you to the home page. But ensure you are logged in.");
//         router.push("/home");
//       } else if (transcript.includes("apartment")) {
//         speak("Here are the available apartments for you.");
//         router.push("/apartments");
//       } else if (transcript.includes("room") || transcript.includes("group")) {
//         speak("Great! Let me take you to the group chat room.");
//         router.push("/rooms");
//       } else if (transcript.includes("chat") || transcript.includes("message")) {
//         speak("Alright, let me take you to the chat page.");
//         router.push("/messages");
//       } else if (transcript.includes("who are you") || transcript.includes("what can you do")) {
//         speak("I’m your Campus Connections Assistant, here to help you navigate, explore features, and answer anything about your student network.");
//       } else if (transcript.includes("start") || transcript.includes("initial")) {
//         speak("Sure! Let me take you to the starting page.");
//         router.push("/");
//       } else if (transcript.includes("khushal") || transcript.includes("creater")) {
//         speak("oh hello khushal! I listen to you everyday! give others to try me! we are the daily communicators!");
//       } else {
//         speak("Sorry, I didn't understand that. Please try again.");
//       }
//     };
    

//     recognition.onerror = (event) => {
//       setMessage("Error occurred: " + event.error);
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognition.start();
//   };

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="speech-container">
//       <button onClick={handleSpeechRecognition} className="mic-button">
//         {listening ? "🎙️ Listening..." : "🎤 Speak"}
//       </button>
//       <p className="speech-message">{message}</p>
//     </div>
//   );
// };

// export default SpeechRecognitionComponent;
