import { MermaidConfig } from 'mermaid';
import { getThemeConfig } from './themes';

// Extend the MermaidConfig interface to include fontawesome and gantt weekday
export interface ExtendedMermaidConfig extends MermaidConfig {
  fontawesome?: {
    cssImport?: string[];
  };
  gantt?: {
    weekday?: any;
    fontFamily?: string;
  } & MermaidConfig['gantt'];
  journey?: {
    fontSize?: number;
  } & MermaidConfig['journey'];
  flowchart?: {
    fill?: string;
  } & MermaidConfig['flowchart'];
  classDiagram2?: {
    diagramPadding?: number;
    useMaxWidth?: boolean;
    htmlLabels?: boolean;
  };
  stateDiagram?: {
    diagramPadding?: number;
    useMaxWidth?: boolean;
    defaultRenderer?: string;
  };
}

export function getMermaidConfig(theme: string = 'modern'): ExtendedMermaidConfig {
  const themeColors = getThemeConfig(theme);

  return {
    theme: 'base',
    themeVariables: themeColors,
    startOnLoad: false,
    securityLevel: 'loose',
    logLevel: 'debug',
    fontFamily: 'sans-serif',
    fontSize: 16,
    maxTextSize: 50000, // Augmenter la taille maximale du texte
    useMaxWidth: true, // Utiliser la largeur maximale disponible
    deterministicIds: true, // Assurer des IDs cohérents
    flowchart: {
      curve: 'basis',
      padding: 20,
      nodeSpacing: 50,
      rankSpacing: 50,
      htmlLabels: true,
      useMaxWidth: true,
      diagramPadding: 8,
      fill: 'white',
      wrap: true, // Permettre le retour à la ligne automatique
    },
    sequence: {
      useMaxWidth: true,
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      boxMargin: 10,
      mirrorActors: false,
      bottomMarginAdj: 1,
      showSequenceNumbers: false,
    },
    classDiagram2: {
      diagramPadding: 20,
      useMaxWidth: true,
      htmlLabels: true,
    },
    pie: {
      textPosition: 0.5,
      useWidth: 100,
      useMaxWidth: true,
    },
    stateDiagram: {
      diagramPadding: 20,
      useMaxWidth: true,
      defaultRenderer: 'dagre-wrapper',
    },
    journey: {
      diagramMarginX: 50,
      diagramMarginY: 20,
      taskMargin: 50,
      width: 150,
      height: 50,
      boxMargin: 10,
      useMaxWidth: true,
      fontSize: 14,
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
      fontFamily: '"Open Sans", sans-serif',
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d',
      topAxis: false,
      useMaxWidth: true,
    },
    fontawesome: {
      cssImport: [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/solid.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css'
      ]
    }
  };
}