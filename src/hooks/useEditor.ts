import { useState, useCallback } from 'react';
import { editor } from 'monaco-editor';

export function useEditor() {
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
  }, []);

  return {
    editorInstance,
    handleEditorMount,
  };
}
