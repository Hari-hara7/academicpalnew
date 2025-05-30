import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { Send, MessageCircle } from "lucide-react";
import logo from "../assets/logo_academic_pal-removebg-preview.png";//frontend/academicpal/src/assets/logo_academic_pal-removebg-preview.png

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSendMessage = async (message: string) => {
    if (showWelcome) setShowWelcome(false); // Hide welcome screen on first message

    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // Simulated bot response (Replace with ML API)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: "Thinking..." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 flex items-center bg-gray-800 shadow-md">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-xl font-semibold">AI Chatbot</h1>
      </div>

      {/* Welcome Screen */}
      {showWelcome ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <img src={logo} alt="Chatbot Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-2xl font-semibold">Hello! I'm your AI assistant</h2>
          <p className="text-gray-400 mt-2">
            Ask me anything about <b>Data Structures & Algorithms</b>! <br />
            <span className="text-sm text-gray-500">
              3rd Semester, 2nd Year, NMAMIT
            </span>
          </p>
          <div className="flex mt-4 space-x-3">
            <MessageCircle className="h-6 w-6 text-blue-500" />
            <Send className="h-6 w-6 text-green-500" />
          </div>
        </div>
      ) : (
        // Chat Messages
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
        </div>
      )}

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
