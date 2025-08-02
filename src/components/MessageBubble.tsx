import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {/* Avatar */}
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0
          ${isUser 
            ? 'bg-gradient-to-br from-purple-500 to-primary-500 text-white' 
            : 'bg-white/20 backdrop-blur-sm text-white border border-white/20'
          }
        `}>
          {isUser ? (
            <i className="bi bi-person-fill"></i>
          ) : (
            <i className="bi bi-robot"></i>
          )}
        </div>

        {/* Message Content */}
        <div className={`
          px-4 py-3 rounded-2xl backdrop-blur-sm border
          ${isUser 
            ? 'bg-gradient-to-br from-purple-500 to-primary-500 text-white border-transparent' 
            : 'bg-white/10 text-white border-white/20'
          }
          ${isUser ? 'rounded-br-md' : 'rounded-bl-md'}
        `}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <p className={`text-xs mt-2 ${isUser ? 'text-white/80' : 'text-white/60'}`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
