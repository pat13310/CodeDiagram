export interface MermaidTheme {
  id: string;
  name: string;
  isDark: boolean;
  category: 'modern' | 'nature' | 'classic' | 'vibrant';
}

export const MERMAID_THEMES: MermaidTheme[] = [
  // Vibrant themes
  { id: 'lemon', name: 'Lemon', isDark: false, category: 'vibrant' },
  { id: 'sunset', name: 'Sunset', isDark: false, category: 'vibrant' },
  { id: 'candy', name: 'Candy', isDark: false, category: 'vibrant' },
  { id: 'neon', name: 'Neon', isDark: true, category: 'vibrant' },
  { id: 'aurora', name: 'Aurora', isDark: true, category: 'vibrant' },
  { id: 'rainbow', name: 'Rainbow', isDark: false, category: 'vibrant' },

  // Modern themes
  { id: 'modern', name: 'Modern Light', isDark: false, category: 'modern' },
  { id: 'modern-dark', name: 'Modern Dark', isDark: true, category: 'modern' },
  { id: 'minimal', name: 'Minimal', isDark: false, category: 'modern' },
  { id: 'elegant', name: 'Elegant Dark', isDark: true, category: 'modern' },
  
  // Nature themes
  { id: 'forest', name: 'Forest', isDark: false, category: 'nature' },
  { id: 'forest-dark', name: 'Forest Dark', isDark: true, category: 'nature' },
  { id: 'ocean', name: 'Ocean', isDark: false, category: 'nature' },
  { id: 'ocean-dark', name: 'Ocean Dark', isDark: true, category: 'nature' },
  { id: 'meadow', name: 'Meadow', isDark: false, category: 'nature' },
  
  // Classic themes
  { id: 'neutral', name: 'Neutral', isDark: false, category: 'classic' },
  { id: 'neutral-dark', name: 'Neutral Dark', isDark: true, category: 'classic' },
  { id: 'business', name: 'Business', isDark: false, category: 'classic' },
  { id: 'corporate', name: 'Corporate', isDark: false, category: 'classic' },
  { id: 'professional', name: 'Professional Dark', isDark: true, category: 'classic' },
];

export const getThemesByCategory = (category: string) => 
  MERMAID_THEMES.filter(theme => theme.category === category);