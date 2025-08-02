import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = currentChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.split(' ').slice(0, 6);
    return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
  };

  const createNewChat = (): string => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: []
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChatId);
    setSidebarOpen(false);
    return newChatId;
  };

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => window.setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "That's a great question! Let me help you with that. Based on what you've asked, I can provide some insights and suggestions that might be useful for your situation.",
      "I understand what you're looking for. Here's my take on this topic, along with some practical examples and considerations you might want to keep in mind.",
      "Excellent point! This is actually a fascinating area to explore. Let me break this down into key components and explain how they work together.",
      "Thanks for bringing this up! I can definitely help you understand this better. Here are the main concepts and how they apply to your specific case.",
      "That's an interesting challenge! I've seen similar situations before, and here's what typically works well in these scenarios."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (content: string) => {
    let chatId = activeChat;
    
    // Create new chat if none exists
    if (!chatId) {
      chatId = createNewChat();
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add user message
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? generateChatTitle(content) : chat.title
          }
        : chat
    ));

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await simulateAIResponse(content);
      
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Add AI message
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      ));
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickStart = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleNewChat = () => {
    createNewChat();
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex overflow-hidden font-inter">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        activeChat={activeChat}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(true)}
          currentChatTitle={currentChat?.title || 'New Chat'}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen onQuickStart={handleQuickStart} />
          ) : (
            <div className="max-w-4xl mx-auto p-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
}

export default App;
