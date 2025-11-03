
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700/50 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500">
          AI Image Generation Studio
        </h1>
      </div>
    </header>
  );
};
