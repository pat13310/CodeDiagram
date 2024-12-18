import React from 'react';
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  SwatchIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { ToolbarButton } from './ToolbarButton';
import { ThemeSelector } from '../ThemeSelector/ThemeSelector';
import { Menu } from '@headlessui/react';
import { Tooltip } from '../Tooltip';
import { ExportMenu } from '../ExportMenu/ExportMenu';
import { MERMAID_THEMES } from '../../constants/themes';

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
  onToggleFullscreen,
}: ToolbarProps) {
  return (
    <div className="bg-gradient-to-r from-stone-900 to-neutral-800 px-4 py-0 flex items-center justify-between shadow-lg relative z-50">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-6 mr-8">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="h-16 object-contain opacity-75"
          />
          <div className="flex items-center space-x-2 bg-stone-700/30 rounded-lg px-3 py-1.5">
            <Menu as="div" className="relative">
              <Tooltip content="Change theme">
                <Menu.Button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <SwatchIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {MERMAID_THEMES.find(t => t.id === currentTheme)?.name || 'Default Theme'}
                  </span>
                </Menu.Button>
              </Tooltip>
              
              <Menu.Items className="absolute left-0 mt-2 origin-top-left focus:outline-none z-[100]">
                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
              </Menu.Items>
            </Menu>
          </div>
        </div>
        
        <div className="h-6 w-px bg-stone-700 mx-2" />
        
        <ToolbarButton
          icon={<ArrowPathIcon className="h-5 w-5" />}
          onClick={onRefresh}
          tooltip="Refresh diagram"
          className="text-stone-200 hover:text-white hover:bg-stone-700/50"
        />
        
        <ToolbarButton
          icon={<DocumentDuplicateIcon className="h-5 w-5" />}
          onClick={onCopy}
          tooltip="Copy diagram as text"
          className="text-stone-200 hover:text-white hover:bg-stone-700/50"
        />
        
        <ExportMenu onExport={onExport} />
        
        <ToolbarButton
          icon={<ShareIcon className="h-5 w-5" />}
          onClick={onShare}
          tooltip="Share diagram"
          className="text-stone-200 hover:text-white hover:bg-stone-700/50"
        />

        <ToolbarButton
          icon={isFullscreen ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
          onClick={onToggleFullscreen}
          tooltip={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="text-stone-200 hover:text-white hover:bg-stone-700/50"
        />
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