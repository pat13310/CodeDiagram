import mermaid from 'mermaid';
import { initializeMermaid } from './initialize';

export async function renderMermaidDiagram(
  code: string,
  elementId: string,
  theme: string,
  onNodeClick?: (nodeId: string) => void
) {
  try {
    // Initialize Mermaid with the current theme
    await initializeMermaid(theme);

    const container = document.getElementById(elementId);
    if (!container) {
      throw new Error('Container element not found');
    }

    // Clean and validate the code
    let processedCode = code.trim();
    
    // Handle URL-encoded content
    try {
      if (processedCode.includes('%')) {
        processedCode = decodeURIComponent(processedCode);
      }
    } catch (error) {
      console.warn('Failed to decode URL-encoded content:', error);
    }

    // Replace escaped newlines
    processedCode = processedCode.replace(/\\n/g, '\n');
    
    // Add theme configuration if not present
    if (!processedCode.startsWith('%%{init:')) {
      processedCode = `%%{init: {'theme': '${theme}'}}%%\n${processedCode}`;
    }

    console.log('Rendering diagram with code:', processedCode);

    try {
      // Generate unique ID for this render
      const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      
      // Render the diagram
      const { svg } = await mermaid.render(uniqueId, processedCode);
      
      // Update container with SVG
      container.innerHTML = svg;

      // Add click handlers if needed
      if (onNodeClick) {
        const nodes = container.querySelectorAll('[id^="node"]');
        nodes.forEach(node => {
          node.addEventListener('click', () => {
            const nodeId = node.id.replace('node', '');
            onNodeClick(nodeId);
          });
        });
      }

      return svg;
    } catch (error) {
      console.error('Error rendering diagram:', error);
      throw new Error(`Failed to render diagram: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in renderMermaidDiagram:', error);
    throw error;
  }
}