import React from 'react';
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  className?: string;
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onReset, className }: ZoomControlsProps) {
  const formattedZoom = Math.round(zoom * 100);

  return (
    <div className={clsx(
      'flex items-center space-x-1 bg-stone-900/90 backdrop-blur-sm rounded-lg p-1.5 border border-stone-800',
      className
    )}>
      <button
        onClick={onZoomOut}
        className={clsx(
          'p-1.5 rounded-md transition-all duration-200',
          zoom <= 0.25
            ? 'text-stone-600 cursor-not-allowed'
            : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
        )}
        disabled={zoom <= 0.25}
        title="Zoom out"
      >
        <MagnifyingGlassMinusIcon className="h-4 w-4" />
      </button>
      
      <button
        onClick={onReset}
        className="px-2 py-1 text-sm font-medium text-stone-300 hover:text-stone-200 hover:bg-stone-800 rounded-md transition-all duration-200 min-w-[60px] border-x border-stone-700"
        title="Reset zoom"
      >
        {formattedZoom}%
      </button>

      <button
        onClick={onZoomIn}
        className={clsx(
          'p-1.5 rounded-md transition-all duration-200',
          zoom >= 2
            ? 'text-stone-600 cursor-not-allowed'
            : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
        )}
        disabled={zoom >= 2}
        title="Zoom in"
      >
        <MagnifyingGlassPlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}