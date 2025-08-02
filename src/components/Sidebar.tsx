import React, { useState } from 'react';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: Chat[];
  activeChat: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  chats, 
  activeChat, 
  onChatSelect, 
  onNewChat 
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-white/10 backdrop-blur-xl border-r border-white/20
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Chat History</h2>
              <button
                onClick={onClose}
                className="lg:hidden text-white/70 hover:text-white transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
            <button
              onClick={onNewChat}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-primary-500 text-white px-4 py-2 rounded-xl
                       hover:from-purple-600 hover:to-primary-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <i className="bi bi-plus-lg"></i>
              New Chat
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`
                  w-full text-left p-3 rounded-xl transition-all duration-200 group
                  ${activeChat === chat.id 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{chat.title}</p>
                    <p className="text-xs opacity-60 mt-1">{chat.timestamp}</p>
                  </div>
                  <i className="bi bi-chat-left-text text-sm opacity-40 group-hover:opacity-60 transition-opacity"></i>
                </div>
              </button>
            ))}
            
            {chats.length === 0 && (
              <div className="text-center text-white/50 py-8">
                <i className="bi bi-chat-square-dots text-3xl mb-2 block"></i>
                <p>No conversations yet</p>
                <p className="text-sm mt-1">Start a new chat to begin</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-center text-white/60 text-sm">
              <p>Powered by</p>
              <p className="font-semibold bg-gradient-to-r from-purple-400 to-primary-400 bg-clip-text text-transparent">
                WebSparks AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
