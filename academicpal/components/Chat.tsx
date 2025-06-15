'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { FaRegSmile, FaPaperclip } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Message {
  user: string;
  text: string;
  timestamp: string;
  avatar: string;
  isBot: boolean;
  file?: string | null;
}

interface ChatProps {
  user: {
    displayName: string;
    photoURL?: string;
  };
}

const Chat = ({ user }: ChatProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        newMessages.push(doc.data() as Message);
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() || file) {
      const messageData: Message = {
        user: user.displayName,
        text: message,
        avatar: user.photoURL || '/default-avatar.png',
        timestamp: new Date().toISOString(),
        isBot: false,
        file: file ? await uploadFile(file) : null,
      };

      await addDoc(collection(db, 'messages'), messageData);
      socket.emit('send_message', messageData);

      setMessage('');
      setFile(null);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    return 'https://path.to.uploaded/file';
  };

  const sendBotReply = (msg: string) => {
    setIsBotTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        user: 'Academic Pal Bot',
        text: `You asked about: "${msg}" - Here is the information...`,
        avatar: 'https://path.to/bot/avatar',
        timestamp: new Date().toISOString(),
        isBot: true,
      };
      addDoc(collection(db, 'messages'), botMessage);
      socket.emit('send_message', botMessage);
      setIsBotTyping(false);
    }, 1500);
  };

  const handleSubmit = () => {
    sendMessage();
    if (
      message.toLowerCase().includes('syllabus') ||
      message.toLowerCase().includes('notes')
    ) {
      sendBotReply(message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      {/* Header */}
      <div className="p-4 border-b border-white/10 backdrop-blur-md">
        <h1 className="text-xl font-bold text-white">Academic Pal Chat</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-md p-4 rounded-xl border border-white/10 backdrop-blur-md ${
              msg.user === user.displayName
                ? 'ml-auto bg-blue-600'
                : 'mr-auto bg-white/5'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Image
                src={msg.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border border-white/20"
              />
              <div className="flex flex-col text-sm">
                <div className="font-semibold">
                  {msg.user}{' '}
                  <span className="text-xs text-gray-400 ml-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div>{msg.text}</div>
                {msg.file && (
                  <a
                    href={msg.file}
                    className="text-blue-400 hover:underline mt-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isBotTyping && (
          <div className="max-w-md p-4 rounded-xl border border-white/10 backdrop-blur-md bg-white/5 mr-auto animate-pulse">
            <div className="flex items-start space-x-3">
              <Image
                src="https://path.to/bot/avatar"
                alt="bot"
                width={40}
                height={40}
                className="rounded-full border border-blue-400"
              />
              <div>
                <div className="font-semibold">Academic Pal Bot</div>
                <div>Typing...</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your message..."
              className="w-full p-4 rounded-xl bg-white/5 text-white placeholder-gray-400 outline-none border border-white/10"
            />
            <div className="absolute right-3 top-3 flex items-center space-x-3">
              <FaRegSmile className="text-white/60 hover:text-blue-500 cursor-pointer" />
              <FaPaperclip
                className="text-white/60 hover:text-blue-500 cursor-pointer"
                onClick={() => document.getElementById('fileInput')?.click()}
              />
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
