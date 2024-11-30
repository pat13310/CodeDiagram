export const ToasterConfig = {
  position: 'bottom-center' as const,
  toastOptions: {
    duration: 2000,
    style: {
      background: '#333',
      color: '#fff',
    },
    success: {
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#EF4444',
        secondary: '#fff',
      },
    },
  },
};