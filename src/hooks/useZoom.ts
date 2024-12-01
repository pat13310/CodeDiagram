import { useState, useCallback } from 'react';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

export function useZoom(initialZoom = 1) {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = useCallback(() => {
    setZoom(prev => {
      const newZoom = prev + (prev * ZOOM_STEP);
      return Math.min(newZoom, MAX_ZOOM);
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = prev - (prev * ZOOM_STEP);
      return Math.max(newZoom, MIN_ZOOM);
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}