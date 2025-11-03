
import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.5 9.5a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v5.5a1 1 0 0 1-1 1zM5 11.5a1 1 0 0 1-1-1V5a1 1 0 0 1 2 0v5.5a1 1 0 0 1-1 1zm9.5 8a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v5.5a1 1 0 0 1-1 1zM9.5 6a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm-5 13.5a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v5.5a1 1 0 0 1-1 1zm9.5-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1z" />
        <path d="m20.62 4.13-2.75 2.75a.5.5 0 0 1-.71 0l-1-1a.5.5 0 0 1 0-.71l2.75-2.75a1.5 1.5 0 0 1 2.12 2.12zM3.38 19.87l2.75-2.75a.5.5 0 0 1 .71 0l1 1a.5.5 0 0 1 0 .71l-2.75 2.75a1.5 1.5 0 0 1-2.12-2.12z" />
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, onGenerate, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onGenerate();
      }
    }
  };

  return (
    <div className="relative">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., A majestic lion wearing a crown, cinematic lighting, detailed..."
        className="w-full p-4 pr-32 bg-slate-800 border border-slate-700 rounded-lg shadow-inner focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none text-slate-200 placeholder-slate-500"
        rows={2}
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-md shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100"
      >
        <MagicWandIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
};
