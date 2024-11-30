import { toast } from 'react-hot-toast';

export const exportToImage = async (elementId: string, format: 'svg' | 'png' = 'png'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Diagram element not found');
    }

    const svg = element.querySelector('svg');
    if (!svg) {
      throw new Error('SVG element not found');
    }

    // Create a clone of the SVG to modify
    const clonedSvg = svg.cloneNode(true) as SVGElement;
    
    // Set dimensions explicitly
    const bbox = svg.getBBox();
    clonedSvg.setAttribute('width', bbox.width.toString());
    clonedSvg.setAttribute('height', bbox.height.toString());
    clonedSvg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    
    // Set white background
    const backgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    backgroundRect.setAttribute('width', '100%');
    backgroundRect.setAttribute('height', '100%');
    backgroundRect.setAttribute('fill', 'white');
    clonedSvg.insertBefore(backgroundRect, clonedSvg.firstChild);

    // Convert SVG to string with XML declaration
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

    if (format === 'svg') {
      // Download as SVG
      const url = URL.createObjectURL(svgBlob);
      downloadFile(url, 'mermaid-diagram.svg');
      return;
    }

    // For PNG conversion
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    
    // Create a Promise to handle the image loading
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    // Set up canvas with proper dimensions
    const canvas = document.createElement('canvas');
    const scale = 2; // For better quality
    canvas.width = bbox.width * scale;
    canvas.height = bbox.height * scale;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scale the context for better quality
    ctx.scale(scale, scale);
    
    // Draw the image
    ctx.drawImage(img, 0, 0);

    // Convert to PNG and download
    try {
      const pngUrl = canvas.toDataURL('image/png');
      downloadFile(pngUrl, 'mermaid-diagram.png');
    } catch (e) {
      throw new Error('Failed to convert to PNG. The diagram might contain external images.');
    }

    // Clean up
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Failed to export diagram:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to export diagram');
  }
};

const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success('Diagram exported successfully');
};