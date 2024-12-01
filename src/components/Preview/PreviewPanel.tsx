import React from 'react';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import * as monaco from 'monaco-editor';
import { ZoomControls } from './ZoomControls';
import { useZoom } from '../../hooks/useZoom';

interface PreviewPanelProps {
  code: string;
  theme: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  editorInstance?: monaco.editor.IStandaloneCodeEditor | null;
  children: React.ReactNode;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function PreviewPanel({ 
  code, 
  theme, 
  isFullscreen, 
  onToggleFullscreen,
  editorInstance,
  children,
  zoom,
  onZoomIn,
  onZoomOut,
  onReset
}: PreviewPanelProps) {
  return (
    <div className={clsx(
      'bg-stone-800/50 rounded-xl overflow-hidden shadow-xl transition-all duration-300 border border-stone-700/50',
      isFullscreen ? 'fixed inset-0 z-50 m-6 rounded-2xl' : 'relative'
    )}>
      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-stone-900 to-neutral-800 border-b border-stone-700/50">
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleFullscreen}
            className="p-1 text-stone-400 hover:text-stone-100 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:ring-offset-stone-800"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div>
          <ZoomControls
            zoom={zoom}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onReset={onReset}
          />
        </div>
      </div>
      <div className="relative h-[calc(100%-40px)]">
        <div 
          className="absolute inset-0 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-600 hover:scrollbar-thumb-stone-500"
          style={{
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}