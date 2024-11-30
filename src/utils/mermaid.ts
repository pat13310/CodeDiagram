import mermaid from 'mermaid';
import { getThemeConfig } from './themes';

export const initializeMermaid = (theme: string = 'default') => {
  const themeConfig = getThemeConfig(theme);

  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      ...themeConfig,
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    flowchart: {
      curve: 'basis',
      padding: 20,
      nodeSpacing: 50,
      rankSpacing: 50,
      htmlLabels: true,
      useMaxWidth: true,
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 20,
      actorMargin: 100,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: false,
      bottomMarginAdj: 1,
      useMaxWidth: true,
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      sectionFontSize: 11,
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d',
      topAxis: false,
    },
    securityLevel: 'loose',
  });
};

export const renderMermaidDiagram = async (
  code: string, 
  elementId: string, 
  theme: string = 'default'
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Initialize Mermaid with the selected theme
    initializeMermaid(theme);

    // Clear previous content
    element.innerHTML = '';
    
    // Create a wrapper for better centering and scaling
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    element.appendChild(wrapper);

    // Render new diagram
    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
    wrapper.innerHTML = svg;

    // Post-process SVG for enhanced styling
    const svgElement = wrapper.querySelector('svg');
    if (svgElement) {
      svgElement.style.maxWidth = '100%';
      svgElement.style.height = 'auto';
      svgElement.style.borderRadius = '12px';
      svgElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

  } catch (error) {
    console.error('Mermaid rendering error:', error);
    throw new Error('Failed to render diagram. Please check your syntax.');
  }
};