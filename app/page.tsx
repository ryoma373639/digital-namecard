'use client';

import { useState } from 'react';
import { Instagram, Twitter, MessageCircle, Send, User, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'Sorry, I could not process your request.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Profile Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 animate-bounce-slow">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-xl opacity-50"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              </div>

              {/* Name & Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 text-center animate-slide-up">
                Your Name
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 text-center animate-slide-up">
                Professional Title / Role
              </p>

              {/* Bio */}
              <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl leading-relaxed animate-slide-up">
                Welcome to my digital namecard! I&apos;m passionate about technology, innovation, and creating amazing experiences.
                Feel free to connect with me on social media or chat with my AI assistant to learn more about me.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </a>

              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                <Twitter className="w-5 h-5" />
                <span className="font-medium">X (Twitter)</span>
              </a>

              <a
                href="https://threads.net/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Threads</span>
              </a>
            </div>

            {/* AI Chat Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowChat(!showChat)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl font-medium text-lg"
              >
                <Sparkles className="w-6 h-6" />
                <span>{showChat ? 'Hide' : 'Chat with AI'}</span>
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          {showChat && (
            <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Assistant
                </h2>
              </div>

              {/* Messages */}
              <div className="space-y-4 mb-6 h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p className="text-lg mb-2">👋 Hi! I&apos;m your AI assistant.</p>
                    <p>Ask me anything about my background, skills, or experience!</p>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm md:text-base">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p>Made with ❤️ using Next.js & Claude AI</p>
        </div>
      </div>
    </main>
  );
}
