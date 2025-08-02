import React from 'react';

interface WelcomeScreenProps {
  onQuickStart: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onQuickStart }) => {
  const quickStarters = [
    {
      icon: 'bi-lightbulb',
      title: 'Explain a concept',
      description: 'Get clear explanations on any topic',
      prompt: 'Explain quantum computing in simple terms'
    },
    {
      icon: 'bi-code-slash',
      title: 'Write code',
      description: 'Generate code snippets and solutions',
      prompt: 'Write a React component for a todo list'
    },
    {
      icon: 'bi-chat-square-text',
      title: 'Creative writing',
      description: 'Help with stories, essays, and content',
      prompt: 'Write a short story about time travel'
    },
    {
      icon: 'bi-graph-up',
      title: 'Data analysis',
      description: 'Analyze trends and interpret data',
      prompt: 'How to analyze customer data for insights?'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-primary-500 rounded-2xl 
                         flex items-center justify-center mx-auto mb-6">
            <i className="bi bi-robot text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to WebSparks AI
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Your intelligent assistant powered by advanced AI. Ask questions, get help with coding, 
            creative writing, analysis, and much more.
          </p>
        </div>

        {/* Quick Starters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickStarters.map((starter, index) => (
            <button
              key={index}
              onClick={() => onQuickStart(starter.prompt)}
              className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl
                       hover:bg-white/20 hover:border-white/30 transition-all duration-200
                       text-left group hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-primary-500/20 
                               rounded-xl flex items-center justify-center shrink-0
                               group-hover:from-purple-500/30 group-hover:to-primary-500/30 transition-all">
                  <i className={`${starter.icon} text-white text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{starter.title}</h3>
                  <p className="text-white/60 text-sm">{starter.description}</p>
                </div>
                <i className="bi bi-arrow-right text-white/40 group-hover:text-white/60 transition-colors"></i>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-lightning-charge text-purple-400 text-xl"></i>
            </div>
            <h4 className="text-white font-medium mb-2">Lightning Fast</h4>
            <p className="text-white/60 text-sm">Get instant responses to your queries</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-shield-check text-primary-400 text-xl"></i>
            </div>
            <h4 className="text-white font-medium mb-2">Secure & Private</h4>
            <p className="text-white/60 text-sm">Your conversations are protected</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-cpu text-green-400 text-xl"></i>
            </div>
            <h4 className="text-white font-medium mb-2">Advanced AI</h4>
            <p className="text-white/60 text-sm">Powered by cutting-edge technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
