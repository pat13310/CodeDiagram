import React, { useState } from 'react';
import type { editor } from 'monaco-editor';
import { AppLayout } from './components/Layout/AppLayout';
import { Toolbar } from './components/Toolbar/Toolbar';
import { EditorPanel } from './components/Editor/EditorPanel';
import { Preview } from './components/Preview/Preview';
import { useMermaidEditor } from './hooks/useMermaidEditor';
import { useEditor } from './hooks/useEditor';
import { useZoom } from './hooks/useZoom';

export default function App() {
  const {
    code,
    setCode,
    theme,
    setTheme,
    handleRefresh,
    handleCopy,
    handleShare,
    handleExport,
  } = useMermaidEditor();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const { editorInstance, handleEditorMount } = useEditor();

  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <AppLayout>
      <Toolbar
        onRefresh={handleRefresh}
        onCopy={handleCopy}
        onShare={handleShare}
        onExport={handleExport}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
      
      <main className="flex-1 p-2">
        <div className={`h-full ${isFullscreen ? '' : 'grid grid-cols-[25%_75%] gap-2'}`}>
          {!isFullscreen && (
            <EditorPanel 
              code={code} 
              onChange={setCode} 
              onMount={handleEditorMount} 
            />
          )}
          <Preview
            {...{ code, theme, isFullscreen, onToggleFullscreen: toggleFullscreen, editorInstance }}
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetZoom}
          />
        </div>
      </main>
    </AppLayout>
  );
}