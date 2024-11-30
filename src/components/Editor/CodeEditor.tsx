import React from 'react';
import Editor from '@monaco-editor/react';
import { useDiagramHighlight } from '../../hooks/useDiagramHighlight';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const editorRef = React.useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useDiagramHighlight(editorRef);

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="markdown"
        theme="vs-dark"
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          rulers: [],
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          glyphMargin: true,
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: true,
        }}
      />
    </div>
  );
}