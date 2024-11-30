import { useEffect, useRef } from 'react';
import { findNodeInCode } from '../utils/codeSearch';

export function useDiagramHighlight(editorRef) {
  const decorationsRef = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleNodeInteraction = (event, type) => {
      if (!editorRef.current) return;

      const target = event.target;
      const node = target.closest('.node');
      
      if (!node) {
        if (type === 'hover') {
          timeoutRef.current = window.setTimeout(clearHighlights, 100);
        } else {
          clearHighlights();
        }
        return;
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      const nodeId = node.id;
      const model = editorRef.current.getModel();
      if (!model) return;

      const code = model.getValue();
      const position = findNodeInCode(code, nodeId);
      
      if (position) {
        highlightCode(position.line, type);
      }
    };

    const highlightCode = (line, type) => {
      const editor = editorRef.current;
      if (!editor) return;

      const model = editor.getModel();
      if (!model) return;

      const lineContent = model.getLineContent(line);
      
      const decorations = editor.deltaDecorations(decorationsRef.current, [{
        range: {
          startLineNumber: line,
          startColumn: 1,
          endLineNumber: line,
          endColumn: lineContent.length + 1
        },
        options: {
          isWholeLine: true,
          className: type === 'click' ? 'selected-code-line' : 'highlighted-code-line',
          glyphMarginClassName: type === 'click' ? 'selected-code-glyph' : 'highlighted-code-glyph',
          minimap: {
            color: type === 'click' ? '#2563EB' : '#3B82F6',
            position: 2
          }
        }
      }]);

      decorationsRef.current = decorations;
      editor.revealLineInCenterIfOutsideViewport(line);
    };

    const clearHighlights = () => {
      if (editorRef.current && decorationsRef.current.length) {
        editorRef.current.deltaDecorations(decorationsRef.current, []);
        decorationsRef.current = [];
      }
    };

    const container = document.getElementById('mermaid-diagram');
    if (container) {
      container.addEventListener('click', (e) => handleNodeInteraction(e, 'click'));
      container.addEventListener('mouseover', (e) => handleNodeInteraction(e, 'hover'));
      container.addEventListener('mouseout', () => {
        timeoutRef.current = window.setTimeout(clearHighlights, 100);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('click', (e) => handleNodeInteraction(e, 'click'));
        container.removeEventListener('mouseover', (e) => handleNodeInteraction(e, 'hover'));
        container.removeEventListener('mouseout', () => {});
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      clearHighlights();
    };
  }, [editorRef]);
}