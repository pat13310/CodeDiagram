import mermaid from 'mermaid';
import { getThemeConfig } from './themes';
import { getMermaidConfig, ExtendedMermaidConfig } from './config';

let currentTheme: string | null = null;

export async function initializeMermaid(theme: string) {
  if (currentTheme === theme) {
    return;
  }

  const config = getMermaidConfig(theme);
  
  try {
    // Reset Mermaid before initializing
    mermaid.mermaidAPI.reset();
    
    // Initialize with new config
    mermaid.initialize(config);
    
    currentTheme = theme;
    console.log('Mermaid initialized with theme:', theme);
  } catch (error) {
    console.error('Error initializing Mermaid:', error);
    throw error;
  }
}