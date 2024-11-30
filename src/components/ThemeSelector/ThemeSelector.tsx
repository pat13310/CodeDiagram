import React from 'react';
import { Tab } from '@headlessui/react';
import { MERMAID_THEMES } from '../../constants/themes';
import { ThemeCategory } from './ThemeCategory';
import { SwatchIcon } from '@heroicons/react/24/outline';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const categories = [
    { name: 'Modern', icon: '🎨', themes: MERMAID_THEMES.filter(t => t.category === 'modern') },
    { name: 'Nature', icon: '🌿', themes: MERMAID_THEMES.filter(t => t.category === 'nature') },
    { name: 'Classic', icon: '📝', themes: MERMAID_THEMES.filter(t => t.category === 'classic') },
    { name: 'Vibrant', icon: '✨', themes: MERMAID_THEMES.filter(t => t.category === 'vibrant') },
  ];

  return (
    <div className="w-[520px] bg-white rounded-xl shadow-xl ring-1 ring-black/5">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <SwatchIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-base font-semibold text-gray-900">Choisir votre Thème</h3>
        </div>
      </div>

      <div className="p-4">
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-lg bg-gray-100/80 p-1.5">
            {categories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) => `
                  flex-1 flex items-center justify-center space-x-2
                  px-3 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200 outline-none
                  ${selected
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }
                `}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {categories.map((category) => (
              <Tab.Panel
                key={category.name}
                className="focus:outline-none"
              >
                <ThemeCategory
                  name={category.name}
                  themes={category.themes}
                  currentTheme={currentTheme}
                  onThemeChange={onThemeChange}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}