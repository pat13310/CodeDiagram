import { MermaidConfig } from 'mermaid';
import { getThemeConfig } from './themes';

export const getMermaidConfig = (theme: string = 'modern'): MermaidConfig => {
  const themeColors = getThemeConfig(theme);

  return {
    theme: 'base',
    themeVariables: themeColors,
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
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    logLevel: 'error',
    securityLevel: 'loose',
    startOnLoad: false,
    fontawesome: {
      cssImport: [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/solid.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css'
      ]
    }
  };
};