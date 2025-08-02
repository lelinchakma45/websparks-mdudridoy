import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="flex items-start gap-3 max-w-[80%]">
        {/* AI Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0
                       bg-white/20 backdrop-blur-sm text-white border border-white/20">
          <i className="bi bi-robot"></i>
        </div>

        {/* Typing Animation */}
        <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-typing"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
