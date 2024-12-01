import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ToasterConfig } from '../../config/toaster';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-stone-950 to-neutral-900">
      {children}
      <Toaster {...ToasterConfig} />
    </div>
  );
}