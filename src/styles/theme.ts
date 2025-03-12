import { css } from 'styled-components';
 
export const baseTheme = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Theme 1: Accessible
export const accessibleTheme = {
  ...baseTheme,
  id: 'accessible',
  colors: {
    background: '#ffffff',
    cardBackground: '#f8f9fa',
    textPrimary: '#000000',
    textSecondary: '#333333',
    accent: '#0056b3', 
    accentLight: '#007bff',
    error: '#d32f2f',
    success: '#2e7d32',
    warning: '#ed6c02',
    info: '#0288d1',
    border: '#757575',
  },
  typography: {
    fontFamily: '"Atkinson Hyperlegible", -apple-system, BlinkMacSystemFont, sans-serif',
    baseSize: '1rem',
    lineHeight: 1.5,
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    h1: {
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    body: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    }
  },
  border: {
    radius: '4px',
    width: '2px',
  },
  animation: {
    duration: '0.2s',
    easing: 'ease-out',
  },
  globalStyles: css`
    *:focus {
      outline: 3px solid #0056b3 !important;
      outline-offset: 2px !important;
    }
    body {
      letter-spacing: 0.5px;
    }
    button, a {
      padding: 0.5rem 1rem;
      min-height: 44px;
      min-width: 44px;
    }
  `
};

// Theme 2: Creative
export const creativeTheme = {
  ...baseTheme,
  id: 'creative',
  colors: {
    background: '#0f0e17',
    cardBackground: '#1a1926',
    textPrimary: '#fffffe',
    textSecondary: '#a7a9be',
    accent: '#7f5af0',
    accentLight: '#9e86ff',
    accentSecondary: '#ff8906',
    error: '#ff5470',
    success: '#2cb67d',
    warning: '#ff8906',
    info: '#7b61ff',
    border: '#2e2c3a',
  },
  typography: {
    fontFamily: '"Clash Display", "Space Grotesk", sans-serif',
    baseSize: '1rem',
    lineHeight: 1.4,
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    h1: {
      fontSize: '4.5rem',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    body: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
    }
  },
  border: {
    radius: '16px',
    width: '1px',
  },
  animation: {
    duration: '0.8s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  globalStyles: css`
    /* Animated gradient background */
    body {
      background: linear-gradient(-45deg, #0f0e17, #171523, #21213a, #1c1b29);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      position: relative;
    }

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #0f0e17;
    }

    ::-webkit-scrollbar-thumb {
      background: #7f5af0;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #9e86ff;
    }

    /* Animated text for headings */
    h1, h2, h3 {
      background: linear-gradient(45deg, #7f5af0, #9e86ff, #ff8906, #e53170);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-text 8s ease infinite;
    }

    @keyframes gradient-text {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    a {
      cursor: none;
    }
    /* Add glowing dots to the background */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: radial-gradient(#7f5af0 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.15;
    }

    /* Custom selection color */
    ::selection {
      background: #7f5af0;
      color: white;
    }
  `
};

// Theme 3: Standard
export const standardTheme = {
  ...baseTheme,
  id: 'standard',
  colors: {
    background: '#ffffff',
    cardBackground: '#f8f9fa',
    textPrimary: '#333333',
    textSecondary: '#6b7280',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
    border: '#e5e7eb',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    baseSize: '1rem',
    lineHeight: 1.5,
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 600,
    },
    h1: {
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      lineHeight: 1.3,
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.6,
    }
  },
  border: {
    radius: '8px',
    width: '1px',
  },
  animation: {
    duration: '0.3s',
    easing: 'ease',
  },
  globalStyles: css`
    body {
      color: #333333;
    }
  `
};

// Theme selector function
export const getThemeById = (id: string) => {
  switch (id) {
    case 'accessible':
      return accessibleTheme;
    case 'creative':
      return creativeTheme;
    case 'standard':
    default:
      return standardTheme;
  }
};

export type ThemeType = typeof standardTheme;