import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ErrorDisplay } from '../ErrorDisplay';
import { renderMermaidDiagram } from '../../utils/mermaid/renderer';
import { useDebounce } from '../../hooks/useDebounce';
import { useZoom } from '../../hooks/useZoom';
import { clsx } from 'clsx';
import * as monaco from 'monaco-editor';
import { useDiagramInteraction } from '../../hooks/useDiagramInteraction';
import { PreviewPanel } from './PreviewPanel';

interface PreviewProps {
  code: string;
  theme: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  editorInstance: monaco.editor.IStandaloneCodeEditor | null;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function Preview({ code, theme, isFullscreen, onToggleFullscreen, editorInstance, zoom, onZoomIn, onZoomOut, onReset }: PreviewProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  
  const debouncedCode = useDebounce(code, 300);
  const debouncedTheme = useDebounce(theme, 300);
  
  const { handleNodeClick, cleanup } = useDiagramInteraction(editorInstance);

  const wrappedHandleNodeClick = useCallback((nodeId: string) => {
    const element = document.querySelector(`[id="node${nodeId}"]`) as HTMLElement;
    if (element) {
      handleNodeClick(nodeId, element);
    }
  }, [handleNodeClick]);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!diagramRef.current || !debouncedCode) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Create container for diagram
        const container = diagramRef.current;
        container.innerHTML = '<div id="mermaid-diagram-content"></div>';

        console.log('Rendering diagram with code:', debouncedCode);
        console.log('Theme:', debouncedTheme);

        // Render the diagram
        await renderMermaidDiagram(
          debouncedCode,
          'mermaid-diagram-content',
          debouncedTheme,
          wrappedHandleNodeClick
        );

        console.log('Diagram rendered successfully');
      } catch (error) {
        console.error('Error rendering diagram:', error);
        if (isMounted) {
          setError(error.message || 'Failed to render diagram');
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
      cleanup();
    };
  }, [debouncedCode, debouncedTheme, wrappedHandleNodeClick, cleanup]);

  return (
    <PreviewPanel
      code={code}
      theme={theme}
      isFullscreen={isFullscreen}
      onToggleFullscreen={onToggleFullscreen}
      editorInstance={editorInstance}
      zoom={zoom}
      onZoomIn={onZoomIn}
      onZoomOut={onZoomOut}
      onReset={onReset}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-800/50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        <div 
          ref={diagramRef}
          className={clsx(
            'w-full h-full flex items-center justify-center',
            'bg-white dark:bg-stone-900 rounded-lg shadow-lg',
            'transition-all duration-300 ease-in-out',
            isLoading ? 'opacity-50' : 'opacity-100'
          )}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        />
        
        {error && (
          <div className="absolute bottom-4 left-4 right-4">
            <ErrorDisplay error={error} />
          </div>
        )}
      </div>
    </PreviewPanel>
  );
}