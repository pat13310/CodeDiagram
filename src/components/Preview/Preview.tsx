import React, { useEffect, useRef, useState } from 'react';
import { ErrorDisplay } from '../ErrorDisplay';
import { renderMermaidDiagram } from '../../utils/mermaid/renderer';
import { useDebounce } from '../../hooks/useDebounce';
import { useZoom } from '../../hooks/useZoom';
import { ZoomControls } from './ZoomControls';
import { clsx } from 'clsx';
import { MERMAID_THEMES } from '../../constants/themes';

interface PreviewProps {
  code: string;
  theme: string;
  isFullscreen: boolean;
}

export function Preview({ code, theme, isFullscreen }: PreviewProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedCode = useDebounce(code, 300);
  const debouncedTheme = useDebounce(theme, 300);
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

  const currentTheme = MERMAID_THEMES.find(t => t.id === theme);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!containerRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        await renderMermaidDiagram(debouncedCode, 'mermaid-diagram', debouncedTheme);
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Failed to render diagram');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [debouncedCode, debouncedTheme]);

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-gray-50 to-white">
      <div className="absolute top-2 left-4 right-4 flex items-center justify-between z-20">
        
        <ZoomControls
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetZoom}
        />
      </div>
      
      <div className={clsx(
        'absolute inset-0 p-6 overflow-auto preview-container',
        isFullscreen ? 'pt-16' : ''
      )}>
        <div 
          className="min-h-full flex items-center justify-center"
          style={{
            minHeight: zoom > 1 ? '150%' : '100%',
            padding: zoom > 1 ? '2rem' : '0',
          }}
        >
          <div
            id="mermaid-diagram"
            ref={containerRef}
            className="relative bg-white/80 backdrop-blur-sm rounded-lg shadow-lg"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out',
              width: '100%',
              height: '100%',
              minHeight: '200px'
            }}
          />
        </div>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900/20 border-t-gray-900" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-30">
          <ErrorDisplay message={error} />
        </div>
      )}
    </div>
  );
}