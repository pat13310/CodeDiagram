import { type Editor } from '@monaco-editor/react';
import { type MutableRefObject } from 'react';

export interface CodePosition {
  line: number;
  text: string;
}

export interface EditorHighlight {
  startLine: number;
  type: 'click' | 'hover';
  editor: Editor;
  decorationsRef: MutableRefObject<string[]>;
}