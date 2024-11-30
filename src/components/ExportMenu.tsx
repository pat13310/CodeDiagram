import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Tooltip } from './Tooltip';

interface ExportMenuProps {
  onExport: (format: 'svg' | 'png') => void;
}

export function ExportMenu({ onExport }: ExportMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Tooltip content="Export diagram">
        <Menu.Button className="p-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors duration-200">
          <ArrowDownTrayIcon className="h-5 w-5" />
        </Menu.Button>
      </Tooltip>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onExport('png')}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-200`}
                >
                  Export as PNG
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onExport('svg')}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-200`}
                >
                  Export as SVG
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}