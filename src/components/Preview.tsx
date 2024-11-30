import React, { useEffect, useRef, useState } from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { renderMermaidDiagram } from '../utils/mermaid';

interface PreviewProps {
  code: string;
}

export function Preview({ code }: PreviewProps) {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      
      try {
        setError(null);
        await renderMermaidDiagram(code, 'mermaid-diagram');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Invalid diagram syntax');
      }
    };

    renderDiagram();
  }, [code]);

  return (
    <div className="h-full w-full bg-white p-4 overflow-auto flex items-center justify-center">
      {error ? (
        <ErrorDisplay message={error} />
      ) : (
        <div id="mermaid-diagram" ref={containerRef} className="mermaid" />
      )}
    </div>
  );
}