import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 
                       rounded-2xl text-white placeholder-white/50 resize-none focus:outline-none 
                       focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                       disabled:opacity-50 disabled:cursor-not-allowed
                       max-h-32 overflow-y-auto"
            />
            
            {/* Character count */}
            <div className="absolute bottom-1 right-12 text-xs text-white/40">
              {message.length}/2000
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-primary-500 text-white rounded-xl
                     hover:from-purple-600 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 flex items-center justify-center shrink-0
                     hover:scale-105 active:scale-95"
          >
            {disabled ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <i className="bi bi-send-fill"></i>
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={() => setMessage('Explain this concept in simple terms: ')}
            className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full hover:bg-white/20 
                     hover:text-white transition-all duration-200"
          >
            <i className="bi bi-lightbulb mr-1"></i>
            Explain
          </button>
          <button
            type="button"
            onClick={() => setMessage('Help me write code for: ')}
            className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full hover:bg-white/20 
                     hover:text-white transition-all duration-200"
          >
            <i className="bi bi-code-slash mr-1"></i>
            Code
          </button>
          <button
            type="button"
            onClick={() => setMessage('Summarize this topic: ')}
            className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full hover:bg-white/20 
                     hover:text-white transition-all duration-200"
          >
            <i className="bi bi-file-text mr-1"></i>
            Summarize
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
