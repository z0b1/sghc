/**
 * Official Hack Club Brand Configuration
 * Based on https://hackclub.com/brand and https://theme.hackclub.com/
 */

export const HackClubBrand = {
  // Official Hack Club Colors
  colors: {
    red: '#ec3750',        // Primary - Hero color
    orange: '#ff8c37',
    yellow: '#f1c40f',
    green: '#33d6a6',
    cyan: '#5bc0de',
    blue: '#338eda',       // Accent
    purple: '#a633d6',
    muted: '#8492a6',      // Muted text
    
    // Neutrals (Light mode)
    text: '#1f2d3d',
    background: '#ffffff',
    elevated: '#f9fafc',
    sheet: '#f9fafc',
    sunken: '#e0e6ed',
    border: '#e0e6ed',
    
    // Neutrals (Dark mode)
    darkText: '#ffffff',
    darkBackground: '#17171d',
    darkElevated: '#252429',
    darkSheet: '#252429',
    darkSunken: '#121217',
    darkBorder: '#252429',
  },

  // Fonts
  fonts: {
    heading: '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", "Roboto Mono", Menlo, Consolas, monospace',
  },

  // Font sizes (in pixels)
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    base: '16px',
    lg: '32px',
    xl: '64px',
  },

  // Border radius
  radii: {
    small: '4px',
    default: '8px',
    extra: '12px',
    ultra: '16px',
    circle: '9999px',
  },

  // Shadows
  shadows: {
    text: '0 1px 2px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.125)',
    small: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 2px 4px rgba(0, 0, 0, 0.0625)',
    card: '0 4px 8px rgba(0, 0, 0, 0.125)',
    elevated: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 8px 12px rgba(0, 0, 0, 0.125)',
  },

  // Logo URLs (from Hack Club CDN)
  logos: {
    flagTopSVG: 'https://assets.hackclub.com/flag-orpheus-top.svg',
    flagLeftSVG: 'https://assets.hackclub.com/flag-orpheus-left.svg',
    flagStandaloneSVG: 'https://assets.hackclub.com/flag-standalone.svg',
    iconRounded: 'https://assets.hackclub.com/icon-rounded.svg',
  },

  // Brand Info
  org: {
    name: 'Hack Club',
    url: 'https://hackclub.com',
    brandUrl: 'https://hackclub.com/brand',
    iconsUrl: 'https://icons.hackclub.com',
  },
};

export type BrandColors = typeof HackClubBrand.colors;
export type BrandFonts = typeof HackClubBrand.fonts;
