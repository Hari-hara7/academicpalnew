'use client';

import React, { useState } from 'react';

const ChatbotDemo = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setChatLog((prev) => [...prev, `You: ${input}`, `Bot: Sorry, I’m still learning!`]);
    setInput('');
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto bg-indigo-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Chatbot Demo</h2>
      <div className="bg-white p-4 h-60 overflow-y-auto rounded-md mb-4 shadow-inner">
        {chatLog.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">Start the conversation below!</p>
        ) : (
          chatLog.map((msg, i) => <p key={i} className="mb-2">{msg}</p>)
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-4 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default ChatbotDemo;
