import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onResponseReceived: (response: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onResponseReceived }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setIsLoading(true);
    
    try {
      const response = await fetch("https://academicpal-ml-chatbot-5.onrender.com/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();

      if (data.success) {
        onResponseReceived(`🔍 Found notes for ${data.subject} (${data.cycle}): ${data.notes_link}`);
      } else {
        onResponseReceived("❌ No matching notes found. Try different keywords.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      onResponseReceived("⚠️ Error connecting to the server. Please try again later.");
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-gray-800 flex items-center">
      <input
        type="text"
        className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        placeholder="Search for notes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={isLoading}
      />
      <button 
        className={`ml-2 p-2 rounded-lg ${isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`} 
        onClick={handleSend}
        disabled={isLoading}
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default ChatInput;
