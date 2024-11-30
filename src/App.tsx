import React from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { Toolbar } from './components/Toolbar/Toolbar';
import { EditorPanel } from './components/Editor/EditorPanel';
import { PreviewPanel } from './components/Preview/PreviewPanel';
import { useMermaidEditor } from './hooks/useMermaidEditor';
import { useFullscreen } from './hooks/useFullscreen';

export default function App() {
  const {
    code,
    setCode,
    theme,
    handleThemeChange,
    handleRefresh,
    handleCopy,
    handleShare,
  } = useMermaidEditor();

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <AppLayout>
      <Toolbar
        onRefresh={handleRefresh}
        onCopy={handleCopy}
        onShare={handleShare}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
      <div className={`flex-1 ${isFullscreen ? '' : 'grid grid-cols-2'} gap-6 p-6`}>
        {!isFullscreen && <EditorPanel code={code} onChange={setCode} />}
        <PreviewPanel 
          code={code} 
          theme={theme}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </AppLayout>
  );
}