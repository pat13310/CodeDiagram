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
        const container = diagramRef.current;
        container.innerHTML = '';

        // Créer un conteneur pour le diagramme
        const diagramContainer = document.createElement('div');
        diagramContainer.id = 'mermaid-diagram-content';
        diagramContainer.style.width = '100%';
        container.appendChild(diagramContainer);

        await renderMermaidDiagram(
          debouncedCode,
          'mermaid-diagram-content',
          debouncedTheme,
          wrappedHandleNodeClick
        );

        // Ajuster le SVG après le rendu
        const svg = diagramContainer.querySelector('svg');
        if (svg) {
          // Récupérer les dimensions originales du SVG
          const viewBox = svg.getAttribute('viewBox')?.split(' ').map(Number) || [];
          const [, , width, height] = viewBox;

          // Récupérer les dimensions naturelles si viewBox n'est pas disponible
          const naturalWidth = width || parseInt(svg.getAttribute('width') || '0', 10);
          const naturalHeight = height || parseInt(svg.getAttribute('height') || '0', 10);

          if (naturalWidth && naturalHeight) {
            // Configurer le SVG pour un affichage correct
            svg.style.display = 'block';
            svg.style.width = `${naturalWidth}px`;
            svg.style.height = `${naturalHeight}px`;
            svg.style.margin = '0 auto'; // Centre horizontalement
            svg.style.maxWidth = '100%'; // Empêche le débordement horizontal
            svg.style.height = 'auto'; // Maintient le ratio d'aspect

            // Ajuster le conteneur pour le centrage vertical
            diagramContainer.style.display = 'flex';
            diagramContainer.style.flexDirection = 'column';
            diagramContainer.style.alignItems = 'center';
            diagramContainer.style.justifyContent = 'center';
            diagramContainer.style.width = '100%';
            diagramContainer.style.minHeight = '100%';
            diagramContainer.style.overflow = 'auto';
          }
        }
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
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0"
          style={{
            overflow: zoom > 1 ? 'auto' : 'hidden'
          }}
        >
          <div
            className="min-h-full w-full flex"
            style={{
              minHeight: zoom > 1 ? `${zoom * 100}%` : '100%'
            }}
          >
            <div 
              className="w-full flex items-center justify-center"
            >
              <div
                style={{
                  transform: `scale(${Math.max(zoom, 0.25)})`,
                  transformOrigin: 'center center'
                }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-800/50 z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
                
                <div 
                  ref={diagramRef}
                  className={clsx(
                    'bg-white dark:bg-stone-900 rounded-lg shadow-lg p-4',
                    'transition-all duration-150 ease-out',
                    isLoading ? 'opacity-50' : 'opacity-100'
                  )}
                />

                {error && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <ErrorDisplay error={error} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewPanel>
  );
}