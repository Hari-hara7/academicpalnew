import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Send, MessageCircle, User, Bot } from "lucide-react";
import logo from "../assets/logo_academic_pal-removebg-preview.png";
import LogoLoader from "./LogoLoader";

interface Message {
  text: string;
  isUser: boolean;
}

const NotesGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Welcome to AcademicPal! I'm your AI-powered notes assistant. Ask me anything about your subjects!",
      isUser: false,
    },
    {
      text: "Try searching for 'python', 'math', 'physics', or 'chemistry'.",
      isUser: false,
    },
  ]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (showWelcome) setShowWelcome(false);

    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    const botResponse = await fetchBotResponse(message);
    handleResponse(botResponse);
  };

  const fetchBotResponse = async (message: string): Promise<string> => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("python")) {
      return "🔍 Found notes for Python: ";
    } else if (lowerCaseMessage.includes("math")) {
      return "📚 Math notes: Algebra, Calculus & Linear Algebra.";
    } else if (lowerCaseMessage.includes("physics")) {
      return "🛸 Check out Physics notes here: ";
    } else if (lowerCaseMessage.includes("chemistry")) {
      return "⚗️ Chemistry notes: Organic & Inorganic concepts.";
    } else {
      return "🤔 I couldn’t find anything. Try another subject or keyword!";
    }
  };

  const handleResponse = (response: string) => {
    setMessages((prev) => [...prev, { text: response, isUser: false }]);
  };

  const renderMessageWithLinks = (text: string) => {
    const linkRegex = /(https?:\/\/[^\s)]+)/g;

    return text.split(linkRegex).map((part, index) => {
      if (linkRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 break-all"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {loading ? (
        <LogoLoader />
      ) : (
        <>
          <div className="p-4 flex items-center bg-dark-800 shadow-md border border-transparent">
            <img src={logo} alt="AcademicPal Logo" className="h-10 w-10 mr-3" />
            <h1 className="text-xl font-semibold">AcademicPal AI</h1>
          </div>

          {showWelcome ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
              <img src={logo} alt="Chatbot Logo" className="w-20 h-20 mb-4 animate-fade-in" />
              <h2 className="text-xl sm:text-2xl font-semibold">
                Hello! I'm your AI notes assistant
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Ask me anything about <b>B.Tech Subjects</b>! <br />
                <span className="text-xs sm:text-sm text-gray-500">
                  Explore Notes.
                </span>
              </p>
              <div className="flex mt-4 space-x-3">
                <MessageCircle className="h-6 w-6 text-blue-500 animate-pulse" />
                <Send className="h-6 w-6 text-green-500 animate-bounce" />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    msg.isUser ? "justify-end" : ""
                  }`}
                >
                  {msg.isUser ? (
                    <User className="h-6 w-6 text-green-500" />
                  ) : (
                    <Bot className="h-6 w-6 text-blue-500" />
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-full sm:max-w-xs text-sm sm:text-base break-words ${
                      msg.isUser ? "bg-green-600" : "bg-gray-800"
                    }`}
                  >
                    {renderMessageWithLinks(msg.text)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          <ChatInput onSendMessage={handleSendMessage} onResponseReceived={handleResponse} />
        </>
      )}
    </div>
  );
};

export default NotesGPT;