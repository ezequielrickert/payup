export const theme = {
    colors: {
        // Fondo oscuro con colores más claros para el contenido
        background: '#1a1a1a',
        surface: '#2a2a2a',
        surfaceHover: '#333333',
        primary: {
            main: '#818cf8',
            light: '#93c5fd',
            dark: '#6366f1',
            gradient: 'linear-gradient(135deg, #818cf8, #93c5fd)'
        },
        secondary: {
            main: '#94a3b8',
            light: '#cbd5e1',
            dark: '#64748b'
        },
        text: {
            primary: '#ffffff',
            secondary: '#94a3b8',
            inverse: '#ffffff'
        },
        border: 'rgba(255, 255, 255, 0.1)',
        success: {
            main: '#4ade80',
            light: '#86efac',
            background: 'rgba(74, 222, 128, 0.15)'
        },
        error: {
            main: '#f87171',
            light: '#fca5a5',
            background: 'rgba(248, 113, 113, 0.15)'
        }
    },
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px'
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
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px'
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
    }
}; 