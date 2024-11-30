import mermaid from 'mermaid';
import { getMermaidConfig } from './config';

export const initializeMermaid = (theme: string = 'lemon'): void => {
  try {
    const config = getMermaidConfig(theme);
    mermaid.initialize({
      ...config,
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      logLevel: 'error',
      securityLevel: 'loose',
      startOnLoad: false,
      flowchart: {
        ...config.flowchart,
        htmlLabels: true,
        curve: 'basis',
        defaultRenderer: 'dagre-d3'
      },
      themeVariables: {
        ...config.themeVariables,
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        fontWeight: 'normal'
      }
    });
  } catch (error) {
    console.error('Failed to initialize Mermaid:', error);
  }
};