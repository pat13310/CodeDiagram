import React from 'react';

interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message = 'Please check your Mermaid syntax' }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="text-red-500 font-medium mb-2">Failed to render diagram</div>
      <div className="text-gray-600 text-sm whitespace-pre-wrap">{message}</div>
      <a 
        href="https://mermaid.js.org/syntax/flowchart.html" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 text-sm mt-4 underline"
      >
        View Mermaid Syntax Documentation
      </a>
    </div>
  );
}