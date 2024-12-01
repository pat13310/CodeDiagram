import { useCallback, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';

interface DiagramNodePosition {
  startLine: number;
  endLine: number;
}

export function useDiagramInteraction(editorInstance: monaco.editor.IStandaloneCodeEditor | null) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const decorationsRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const clearDecorations = useCallback(() => {
    if (editorInstance && decorationsRef.current.length) {
      decorationsRef.current = editorInstance.deltaDecorations(decorationsRef.current, []);
    }
  }, [editorInstance]);

  const highlightCodeLines = useCallback((startLine: number, endLine: number) => {
    if (!editorInstance) return;

    // Nettoyer les décorations existantes
    clearDecorations();

    // Révéler les lignes avec animation
    editorInstance.revealLinesInCenterIfOutsideViewport(startLine, endLine, monaco.editor.ScrollType.Smooth);

    // Créer les nouvelles décorations
    decorationsRef.current = editorInstance.deltaDecorations([], [
      {
        range: new monaco.Range(startLine, 1, endLine, 1),
        options: {
          isWholeLine: true,
          className: 'highlighted-code-line',
          glyphMarginClassName: 'highlighted-code-glyph',
          overviewRuler: {
            color: '#007acc',
            position: monaco.editor.OverviewRulerLane.Full
          },
          minimap: {
            color: '#007acc',
            position: monaco.editor.MinimapPosition.Inline
          }
        }
      }
    ]);

    // Nettoyer après un délai
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(clearDecorations, 5000);
  }, [editorInstance, clearDecorations]);

  const handleNodeClick = useCallback((nodeId: string, element: HTMLElement) => {
    // Mettre à jour le nœud actif
    if (activeNodeId && activeNodeId !== nodeId) {
      const prevElement = document.querySelector(`[data-node-id="${activeNodeId}"]`);
      prevElement?.classList.remove('active');
    }
    setActiveNodeId(nodeId);
    element.classList.add('active');

    // Extraire et traiter les informations de ligne
    const match = nodeId.match(/line-(\d+)(?:-(\d+))?/);
    if (match) {
      const startLine = parseInt(match[1], 10);
      const endLine = match[2] ? parseInt(match[2], 10) : startLine;
      highlightCodeLines(startLine, endLine);
    }

    // Nettoyer la classe active après un délai
    setTimeout(() => {
      element.classList.remove('active');
      setActiveNodeId(null);
    }, 5000);
  }, [highlightCodeLines, activeNodeId]);

  const handleNodeMouseEnter = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    const nodeId = target.id;
    
    if (nodeId && editorInstance) {
      // Extraire les numéros de ligne du nodeId ou des attributs data-*
      const lineInfo = extractLineInfo(target);
      if (lineInfo) {
        highlightCodeLines(lineInfo.startLine, lineInfo.endLine);
      }
    }
  }, [editorInstance, highlightCodeLines]);

  const handleNodeMouseLeave = useCallback((event: Event) => {
    clearDecorations();
  }, [clearDecorations]);

  const extractLineInfo = (element: HTMLElement): DiagramNodePosition | null => {
    // Chercher l'élément parent le plus proche avec les attributs data-line
    let current = element;
    while (current && !current.hasAttribute('data-line-start')) {
      current = current.parentElement as HTMLElement;
    }

    if (current) {
      const startLine = parseInt(current.getAttribute('data-line-start') || '1');
      const endLine = parseInt(current.getAttribute('data-line-end') || String(startLine));
      return { startLine, endLine };
    }
    return null;
  };

  useEffect(() => {
    const container = document.querySelector('.mermaid');
    if (container) {
      container.addEventListener('mouseenter', handleNodeMouseEnter, true);
      container.addEventListener('mouseleave', handleNodeMouseLeave, true);
    }

    return () => {
      const container = document.querySelector('.mermaid');
      if (container) {
        container.removeEventListener('mouseenter', handleNodeMouseEnter, true);
        container.removeEventListener('mouseleave', handleNodeMouseLeave, true);
      }
      clearDecorations();
    };
  }, [handleNodeMouseEnter, handleNodeMouseLeave, clearDecorations]);

  // Nettoyer les décorations lors du démontage
  const cleanup = useCallback(() => {
    clearDecorations();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [clearDecorations]);

  return {
    handleNodeClick,
    handleNodeMouseEnter,
    handleNodeMouseLeave,
    cleanup,
    activeNodeId
  };
}
