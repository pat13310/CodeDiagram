import mermaid from 'mermaid';
import { initializeMermaid } from './initialize';

export const renderMermaidDiagram = async (
  code: string,
  elementId: string,
  theme: string = 'lemon'
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Initialize with current theme
    initializeMermaid(theme);

    // Clear previous content
    element.innerHTML = '';
    
    // Create wrapper for centering
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    element.appendChild(wrapper);

    // Generate unique ID for this render
    const uniqueId = `mermaid-${Date.now()}`;

    // Render the diagram
    const { svg } = await mermaid.render(uniqueId, code);
    wrapper.innerHTML = svg;

    // Post-process SVG
    const svgElement = wrapper.querySelector('svg');
    if (svgElement) {
      svgElement.style.maxWidth = '100%';
      svgElement.style.height = 'auto';
      svgElement.style.borderRadius = '8px';
      svgElement.style.padding = '16px';

      // Fix viewBox if needed
      const bbox = svgElement.getBBox();
      svgElement.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      
      // Ensure proper scaling
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
      svgElement.style.minWidth = '200px';
    }

    // Add click handlers for nodes
    const nodes = wrapper.querySelectorAll('.node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        nodes.forEach(n => n.classList.remove('selected'));
        node.classList.add('selected');
      });
    });

  } catch (error) {
    console.error('Mermaid rendering error:', error);
    throw new Error('Failed to render diagram. Please check your syntax.');
  }
};