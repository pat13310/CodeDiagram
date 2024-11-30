import React from 'react';
import { CodeEditor } from './CodeEditor';

interface EditorPanelProps {
  code: string;
  onChange: (value: string) => void;
}

export function EditorPanel({ code, onChange }: EditorPanelProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl ring-1 ring-white/10">
      <CodeEditor value={code} onChange={onChange} />
    </div>
  );
}