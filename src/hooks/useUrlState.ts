export function useUrlState() {
  const loadFromUrl = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('code');
    return sharedCode ? decodeURIComponent(sharedCode) : null;
  };

  const shareUrl = (code: string): string => {
    const encodedCode = encodeURIComponent(code);
    return `${window.location.origin}?code=${encodedCode}`;
  };

  return {
    loadFromUrl,
    shareUrl,
  };
}