import { useCallback } from 'react';
import { useUrlState } from './useUrlState';
import mermaid from 'mermaid';
import toast from 'react-hot-toast';

const DEFAULT_CODE = `%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px' }}}%%
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]`;

const DEFAULT_THEME = 'default';

export function useMermaidEditor() {
  const [code, setCode] = useUrlState('code', DEFAULT_CODE);
  const [theme, setTheme] = useUrlState('theme', DEFAULT_THEME);

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, [setTheme]);

  const handleRefresh = useCallback(() => {
    setCode(DEFAULT_CODE);
    setTheme(DEFAULT_THEME);
  }, [setCode, setTheme]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy code:', error);
      toast.error('Failed to copy code to clipboard');
    }
  }, [code]);

  const handleShare = useCallback(() => {
    try {
      const url = new URL(window.location.href);
      navigator.clipboard.writeText(url.toString());
      toast.success('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL:', error);
      toast.error('Failed to copy URL to clipboard');
    }
  }, []);

  const handleExport = useCallback(async () => {
    try {
      const svg = document.querySelector('#mermaid-diagram-content svg');
      if (!svg) {
        throw new Error('SVG not found');
      }

      // Create a blob from the SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      // Create and click a download link
      const link = document.createElement('a');
      link.href = url;
      link.download = 'diagram.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      URL.revokeObjectURL(url);

      toast.success('Diagram exported as SVG!');
    } catch (error) {
      console.error('Failed to export diagram:', error);
      toast.error('Failed to export diagram');
    }
  }, []);

  return {
    code,
    setCode,
    theme,
    setTheme,
    handleRefresh,
    handleCopy,
    handleShare,
    handleExport,
    handleThemeChange,
  };
}