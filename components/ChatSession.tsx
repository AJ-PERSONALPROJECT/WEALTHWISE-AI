
import React, { useState, useRef, useEffect } from 'react';
import { Message, UserProfile } from '../types';
import { chatWithWealthWise } from '../services/geminiService';
import { Send, User, Bot, ExternalLink, Globe } from 'lucide-react';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

interface ChatSessionProps {
  profile: UserProfile;
}

const ChatSession: React.FC<ChatSessionProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Hello ${profile.name}, I'm ready to help you execute on these strategies. What specific challenge can we solve today? (e.g., "Write a pitch for a freelance client" or "How do I start a car detailing business with $100?")`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithWealthWise([...messages, userMessage], profile);
    
    setMessages(prev => [...prev, {
      role: 'model',
      text: response.text,
      sources: response.sources,
      timestamp: Date.now()
    }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-emerald-600 ml-3' : 'bg-slate-800 mr-3'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white shadow-md rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                <div className="prose prose-sm prose-slate max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                      <Globe className="w-3 h-3 mr-1" /> Verified Sources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, sIdx) => (
                        <a 
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md hover:border-emerald-400 transition text-slate-600 truncate max-w-[200px]"
                        >
                          <span className="truncate">{source.title}</span>
                          <ExternalLink className="w-2 h-2 ml-1 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 mr-3 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask for a detailed plan, pitch draft, or market analysis..."
              className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none max-h-40"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 disabled:hover:bg-emerald-600 shadow-lg shadow-emerald-200"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          WealthWise AI provides strategic guidance. Always verify specific legal or financial requirements for your location.
        </p>
      </div>
    </div>
  );
};

export default ChatSession;
