import React from 'react';
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  SwatchIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { Tooltip } from './Tooltip';
import { ThemeSelector } from './ThemeSelector/ThemeSelector';
import { ExportMenu } from './ExportMenu';
import { Menu } from '@headlessui/react';

interface ToolbarProps {
  onRefresh: () => void;
  onCopy: () => void;
  onShare: () => void;
  onExport: (format: 'svg' | 'png') => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function Toolbar({ 
  onRefresh, 
  onCopy, 
  onShare, 
  onExport,
  currentTheme, 
  onThemeChange,
  isFullscreen,
  onToggleFullscreen
}: ToolbarProps) {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center justify-between shadow-lg relative z-50">
      <div className="flex items-center space-x-2">
        <h1 className="text-white text-xl font-semibold mr-6">Mermaid Live Editor</h1>
        <Tooltip content="Reset to default diagram">
          <button
            onClick={onRefresh}
            className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </Tooltip>
        <Tooltip content="Copy diagram code">
          <button
            onClick={onCopy}
            className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
        </Tooltip>
        <Tooltip content="Share diagram">
          <button
            onClick={onShare}
            className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </Tooltip>
        <Menu as="div" className="relative">
          <Tooltip content="Change theme">
            <Menu.Button className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200">
              <SwatchIcon className="h-5 w-5" />
            </Menu.Button>
          </Tooltip>
          <Menu.Items className="absolute left-0 mt-2 origin-top-left rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </Menu.Items>
        </Menu>
        <Tooltip content={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          <button
            onClick={onToggleFullscreen}
            className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>
        </Tooltip>
        <ExportMenu onExport={onExport} />
      </div>
      <a
        href="https://mermaid.js.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
      >
        Documentation ↗
      </a>
    </div>
  );
}