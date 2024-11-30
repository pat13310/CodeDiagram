import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '../Tooltip';
import { clsx } from 'clsx';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  const formattedZoom = Math.round(zoom * 100);

  return (
    <div className="absolute top-2 right-2 flex items-center bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-2 z-20">
      <div className="flex items-center space-x-1">
        <Tooltip content="Zoom out">
          <button
            onClick={onZoomOut}
            className={clsx(
              'p-2 rounded-lg transition-all duration-200',
              zoom <= 0.25
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200'
            )}
            disabled={zoom <= 0.25}
          >
            <MinusIcon className="h-5 w-5" />
          </button>
        </Tooltip>
        
        <button
          onClick={onReset}
          className="px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 min-w-[64px]"
        >
          {formattedZoom}%
        </button>

        <Tooltip content="Zoom in">
          <button
            onClick={onZoomIn}
            className={clsx(
              'p-2 rounded-lg transition-all duration-200',
              zoom >= 2
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200'
            )}
            disabled={zoom >= 2}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}