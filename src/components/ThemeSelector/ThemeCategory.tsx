import React from 'react';
import { MermaidTheme } from '../../constants/themes';
import { CheckIcon } from '@heroicons/react/24/outline';

interface ThemeCategoryProps {
  name: string;
  themes: MermaidTheme[];
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeCategory({ themes, currentTheme, onThemeChange }: ThemeCategoryProps) {
  return (
    <div className="space-y-1 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`
            w-full px-3 py-2.5 rounded-lg
            flex items-center justify-between
            transition-all duration-200 group
            ${currentTheme === theme.id
              ? 'bg-gray-900 text-white'
              : 'hover:bg-gray-100'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`
              w-8 h-8 rounded-md flex items-center justify-center
              ${currentTheme === theme.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}
            `}>
              {currentTheme === theme.id ? (
                <CheckIcon className="w-5 h-5 text-white" />
              ) : (
                <div className={`
                  w-4 h-4 rounded
                  ${theme.isDark ? 'bg-gray-800' : 'bg-white border border-gray-300'}
                `} />
              )}
            </div>
            
            <div className="flex flex-col items-start">
              <span className={`
                text-sm font-medium
                ${currentTheme === theme.id ? 'text-white' : 'text-gray-900'}
              `}>
                {theme.name}
              </span>
              {theme.isDark && (
                <span className={`
                  text-xs
                  ${currentTheme === theme.id ? 'text-white/70' : 'text-gray-500'}
                `}>
                  Dark variant
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}