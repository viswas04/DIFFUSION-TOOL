
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg relative mb-4"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
