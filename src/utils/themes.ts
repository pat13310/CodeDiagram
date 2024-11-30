import { type MermaidTheme } from '../constants/themes';

interface ThemeConfig {
  [key: string]: {
    primaryColor: string;
    primaryTextColor: string;
    primaryBorderColor: string;
    lineColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    background: string;
  };
}

const themeConfigs: ThemeConfig = {
  // Dark themes with deeper colors
  dark: {
    primaryColor: '#4B5563',
    primaryTextColor: '#F9FAFB',
    primaryBorderColor: '#6B7280',
    lineColor: '#9CA3AF',
    secondaryColor: '#374151',
    tertiaryColor: '#111827',
    background: '#030712',
  },
  midnight: {
    primaryColor: '#312E81',
    primaryTextColor: '#E0E7FF',
    primaryBorderColor: '#4338CA',
    lineColor: '#6366F1',
    secondaryColor: '#1E1B4B',
    tertiaryColor: '#0C0A24',
    background: '#020617',
  },
  abyss: {
    primaryColor: '#1E3A8A',
    primaryTextColor: '#DBEAFE',
    primaryBorderColor: '#2563EB',
    lineColor: '#60A5FA',
    secondaryColor: '#1E3A8A',
    tertiaryColor: '#172554',
    background: '#030B2B',
  },
  obsidian: {
    primaryColor: '#0F172A',
    primaryTextColor: '#F8FAFC',
    primaryBorderColor: '#334155',
    lineColor: '#64748B',
    secondaryColor: '#0F172A',
    tertiaryColor: '#020617',
    background: '#020617',
  },
  // Existing themes with adjusted contrast
  navy: {
    primaryColor: '#1E40AF',
    primaryTextColor: '#FFFFFF',
    primaryBorderColor: '#3B82F6',
    lineColor: '#93C5FD',
    secondaryColor: '#1E3A8A',
    tertiaryColor: '#0C1B44',
    background: '#020817',
  },
  ocean: {
    primaryColor: '#0891B2',
    primaryTextColor: '#ECFEFF',
    primaryBorderColor: '#06B6D4',
    lineColor: '#67E8F9',
    secondaryColor: '#164E63',
    tertiaryColor: '#082F49',
    background: '#042F2E',
  },
  mocha: {
    primaryColor: '#78350F',
    primaryTextColor: '#FEF3C7',
    primaryBorderColor: '#92400E',
    lineColor: '#D6D3D1',
    secondaryColor: '#451A03',
    tertiaryColor: '#27140A',
    background: '#1C0F0B',
  },
  crimson: {
    primaryColor: '#991B1B',
    primaryTextColor: '#FEE2E2',
    primaryBorderColor: '#DC2626',
    lineColor: '#FCA5A5',
    secondaryColor: '#7F1D1D',
    tertiaryColor: '#450A0A',
    background: '#27090A',
  },
  forest: {
    primaryColor: '#166534',
    primaryTextColor: '#DCFCE7',
    primaryBorderColor: '#16A34A',
    lineColor: '#86EFAC',
    secondaryColor: '#14532D',
    tertiaryColor: '#052E16',
    background: '#022C1C',
  },
  // Light themes remain unchanged
  default: {
    primaryColor: '#3B82F6',
    primaryTextColor: '#1F2937',
    primaryBorderColor: '#60A5FA',
    lineColor: '#6B7280',
    secondaryColor: '#93C5FD',
    tertiaryColor: '#EFF6FF',
    background: '#FFFFFF',
  },
  neutral: {
    primaryColor: '#4B5563',
    primaryTextColor: '#1F2937',
    primaryBorderColor: '#6B7280',
    lineColor: '#9CA3AF',
    secondaryColor: '#D1D5DB',
    tertiaryColor: '#F9FAFB',
    background: '#FFFFFF',
  },
};

export const getThemeConfig = (themeId: string) => {
  return themeConfigs[themeId] || themeConfigs.default;
};