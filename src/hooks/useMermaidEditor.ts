import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { DEFAULT_MERMAID_CODE } from '../constants/defaultCode';
import { useUrlState } from './useUrlState';
import { copyToClipboard } from '../utils/clipboard';

export function useMermaidEditor() {
  const [code, setCode] = useState(DEFAULT_MERMAID_CODE);
  const [theme, setTheme] = useState('lemon');
  const { loadFromUrl, shareUrl } = useUrlState();

  useEffect(() => {
    const sharedCode = loadFromUrl();
    if (sharedCode) {
      setCode(sharedCode);
    }
  }, [loadFromUrl]);

  const handleRefresh = useCallback(() => {
    setCode(DEFAULT_MERMAID_CODE);
    toast.success('Reset to default diagram');
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(code);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  }, [code]);

  const handleShare = useCallback(async () => {
    try {
      const url = shareUrl(code);
      await copyToClipboard(url);
      toast.success('Share link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to create share link');
    }
  }, [code, shareUrl]);

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  }, []);

  return {
    code,
    setCode,
    theme,
    handleThemeChange,
    handleRefresh,
    handleCopy,
    handleShare,
  };
}