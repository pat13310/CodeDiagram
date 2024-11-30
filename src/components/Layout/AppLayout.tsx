import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ToasterConfig } from '../../config/toaster';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      {children}
      <Toaster {...ToasterConfig} />
    </div>
  );
}