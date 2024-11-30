import React from 'react';
import { Preview } from './Preview';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface PreviewPanelProps {
  code: string;
  theme: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function PreviewPanel({ code, theme, isFullscreen, onToggleFullscreen }: PreviewPanelProps) {
  return (
    <div className={clsx(
      'bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300',
      isFullscreen ? 'fixed inset-0 z-50 m-6 rounded-2xl' : 'relative'
    )}>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between">
        <h2 className="text-white font-medium">Diagramme</h2>
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <ArrowsPointingInIcon className="h-5 w-5" />
          ) : (
            <ArrowsPointingOutIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="h-[calc(100%-40px)]">
        <Preview code={code} theme={theme} isFullscreen={isFullscreen} />
      </div>
    </div>
  );
}