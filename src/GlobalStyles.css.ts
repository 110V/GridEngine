import { createTheme } from '@vanilla-extract/css';

export const [globalVarClass, vars] = createTheme({
  color: {
    brand: '#262626',
    brandDark: '#1c1c1c',
    brandLight: '#2e2e2e',
  },
  font: {
    body: 'InfinitySans-RegularA1, Verdana, sans-serif',
    medium: '14px',
    large: '16px',
    small: '12px'
  }
});

