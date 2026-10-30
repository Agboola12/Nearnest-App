/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Teal Palette
        primary: {
          DEFAULT: '#0D9488', // Teal 600
          dark: '#0F766E',    // Teal 700
          light: '#14B8A6',   // Teal 500
          wash: '#F0FDFA',    // Teal 50
          container: '#008378',
        },
        'teal-light': '#14B8A6',
        'teal-deep': '#0F766E',
        'teal-wash': '#F0FDFA',
        'on-primary': '#ffffff',
        'on-primary-container': '#f4fffc',

        // Surfaces & Canvas
        surface: {
          DEFAULT: '#FAF9F5',
          base: '#FBFBFA',
          warm: '#F4F3EF',
          card: '#FFFFFF',
          dim: '#DBDAD6',
          bright: '#FAF9F5',
          container: {
            lowest: '#FFFFFF',
            low: '#F5F4F0',
            DEFAULT: '#EFEEEA',
            high: '#E9E8E4',
            highest: '#E3E2DF',
          },
        },
        'surface-base': '#FBFBFA',
        'surface-warm': '#F4F3EF',
        'surface-card': '#FFFFFF',
        'surface-dim': '#DBDAD6',
        'surface-bright': '#FAF9F5',
        'surface-container': '#EFEEEA',
        'surface-container-low': '#F5F4F0',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-high': '#E9E8E4',
        'surface-container-highest': '#E3E2DF',

        // Text & Contrast Elements
        'text-primary': '#0F172A',   // Slate 900
        'text-secondary': '#334155', // Slate 700
        'text-muted': '#64748B',     // Slate 500
        'on-surface': '#1B1C1A',
        'on-surface-variant': '#3D4947',
        'on-background': '#1B1C1A',

        // Borders & Outlines
        'border-subtle': '#E2E8F0',  // Slate 200
        'border-warm': '#E4E4E7',    // Zinc 200
        outline: '#6D7A77',
        'outline-variant': '#BCC9C6',

        // Secondary & Tertiary
        secondary: {
          DEFAULT: '#565E74',
          fixed: '#DAE2FD',
          container: '#DAE2FD',
        },
        'secondary-fixed': '#DAE2FD',
        'on-secondary-fixed': '#131B2E',
        tertiary: {
          DEFAULT: '#825100',
          fixed: '#FFDDB8',
        },
        'tertiary-fixed': '#FFDDB8',
        'badge-amber-bg': '#FEF3C7',
        'badge-amber-text': '#92400E',

        // Semantic Status
        status: {
          'confirmed-bg': '#DCFCE7',
          'confirmed-text': '#166534',
          'pending-bg': '#FEF9C3',
          'pending-text': '#854D0E',
          'rejected-bg': '#FEE2E2',
          'rejected-text': '#991B1B',
        },
        'status-confirmed-bg': '#DCFCE7',
        'status-confirmed-text': '#166534',
        'status-pending-bg': '#FEF9C3',
        'status-pending-text': '#854D0E',
        'status-rejected-bg': '#FEE2E2',
        'status-rejected-text': '#991B1B',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        'display-hero': ['"Plus Jakarta Sans"', 'sans-serif'],
        'headline-xl': ['"Plus Jakarta Sans"', 'sans-serif'],
        'headline-lg': ['"Plus Jakarta Sans"', 'sans-serif'],
        'headline-md': ['"Plus Jakarta Sans"', 'sans-serif'],
        'headline-sm': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body-lg': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body-md': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body-sm': ['"Plus Jakarta Sans"', 'sans-serif'],
        'label-md': ['"Plus Jakarta Sans"', 'sans-serif'],
        'label-sm': ['"Plus Jakarta Sans"', 'sans-serif'],
        'meta-mono': ['"Plus Jakarta Sans"', 'monospace'],
      },
      fontSize: {
        'display-hero': ['3.25rem', { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '800' }],
        'headline-xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '700' }],
        'headline-md': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm': ['1.125rem', { lineHeight: '1.45', letterSpacing: '0em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.005em', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.55', letterSpacing: '0em', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
        'label-md': ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-sm': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.025em', fontWeight: '600' }],
        'meta-mono': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.03em', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        card: '1rem',
        pill: '9999px',
        full: '9999px',
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'space-2xl': '4rem',
        gutter: '1.5rem',
        'gutter-desktop': '2rem',
        margin: '1rem',
        'margin-tablet': '2rem',
        'margin-desktop': '3rem',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        elevated: '0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
        floating: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
