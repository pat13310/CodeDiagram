import React from "react";
import { CodeEditor } from "./CodeEditor";
import { useMermaidEditor } from "../../hooks/useMermaidEditor";
import { useFullscreen } from "../../hooks/useFullscreen";
import { clsx } from "clsx";
import * as monaco from "monaco-editor";

interface EditorPanelProps {
  code: string;
  onChange: (value: string) => void;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export function EditorPanel({ code, onChange, onMount }: EditorPanelProps) {
  const { theme } = useMermaidEditor();
  const { isFullscreen } = useFullscreen();

  return (
    <div className={clsx(
      'flex-1 min-w-0',
      isFullscreen ? 'hidden' : ''
    )}>
      <CodeEditor
        value={code}
        onChange={onChange}
        onMount={onMount}
      />
    </div>
  );
}