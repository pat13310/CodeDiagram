import { useEffect, useState } from 'react';

export function useUrlState(key: string, defaultValue: string) {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultValue;
    
    const urlParams = new URLSearchParams(window.location.search);
    const sharedValue = urlParams.get(key);
    return sharedValue ? decodeURIComponent(sharedValue) : defaultValue;
  });

  useEffect(() => {
    // Update URL when value changes
    const url = new URL(window.location.href);
    if (value === defaultValue) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, encodeURIComponent(value));
    }
    window.history.replaceState({}, '', url.toString());
  }, [value, key, defaultValue]);

  return [value, setValue] as const;
}