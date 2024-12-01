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
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.maxHeight = '80vh';
            svg.style.margin = '0 auto';
            svg.style.objectFit = 'contain';
            
            // Ajuster le conteneur pour le centrage
            diagramContainer.style.display = 'flex';
            diagramContainer.style.alignItems = 'center';
            diagramContainer.style.justifyContent = 'center';
            diagramContainer.style.width = '100%';
            diagramContainer.style.height = '100%';
            diagramContainer.style.position = 'relative';

            // Optimiser le viewBox pour un meilleur rendu
            const bbox = svg.getBBox();
            const padding = 20; // Ajouter un peu d'espace autour
            svg.setAttribute('viewBox', 
              `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
            );

            // Améliorer la qualité du rendu
            svg.style.shapeRendering = 'geometricPrecision';
            svg.style.textRendering = 'geometricPrecision';
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
      <div className="w-full h-full bg-white dark:bg-stone-900">
        <div 
          className="w-full h-full overflow-auto relative"
        >
          <div
            className={clsx(
              "w-full flex justify-center p-4",
              zoom <= 1 ? "h-full items-center" : "items-start"
            )}
            style={{
              minHeight: zoom > 1 ? `${zoom * 100}%` : '100%'
            }}
          >
            <div
              ref={diagramRef}
              className={clsx(
                'transition-all duration-150 ease-out w-full h-full',
                isLoading ? 'opacity-50' : 'opacity-100'
              )}
              style={{
                transform: `scale(${Math.max(zoom, 0.25)})`,
                transformOrigin: zoom > 1 ? 'top center' : 'center center'
              }}
            />
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-800/50 z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
            </div>
          )}

          {error && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <ErrorDisplay error={error} />
            </div>
          )}
        </div>
      </div>
    </PreviewPanel>
  );
}