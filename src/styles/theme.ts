// Theme colors based on reference design
export const theme = {
  colors: {
    // Primary colors - teal/blue based like reference
    primary: '#00897B',
    primaryDark: '#00695C',
    primaryLight: '#4DB6AC',
    primaryLighter: '#E0F2F1',
    
    // Secondary colors
    secondary: '#546E7A',
    secondaryDark: '#37474F',
    secondaryLight: '#78909C',
    
    // Background colors
    background: '#F5F5F5',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    
    // Text colors
    textPrimary: '#263238',
    textSecondary: '#546E7A',
    textLight: '#90A4AE',
    
    // Accent colors
    accent: '#FF6B6B',
    accentLight: '#FFE5E5',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Border colors
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    borderDark: '#BDBDBD'
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 4px 6px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  
  typography: {
    fontFamily: {
      primary: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      secondary: '"Poppins", "Inter", "Segoe UI", sans-serif'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  }
}
