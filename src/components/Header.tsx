import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  currentChatTitle: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, currentChatTitle }) => {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl p-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2 -ml-2"
          >
            <i className="bi bi-list text-xl"></i>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-primary-500 rounded-lg 
                           flex items-center justify-center">
              <i className="bi bi-robot text-white text-sm"></i>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">WebSparks AI</h1>
              <p className="text-white/60 text-sm">{currentChatTitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-white/70 hover:text-white transition-colors p-2">
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
