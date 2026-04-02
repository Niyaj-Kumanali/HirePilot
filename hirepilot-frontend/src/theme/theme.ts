import { createTheme, type PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: '#a855f7', // Purple 500
                light: '#c084fc',
                dark: '#7e22ce',
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#6366f1', // Indigo 500
                light: '#818cf8',
                dark: '#4f46e5',
                contrastText: '#ffffff',
            },
            ...(mode === 'light'
                ? {
                    // Light mode palette
                    background: {
                        default: '#f8fafc', // Slate 50
                        paper: '#ffffff',
                    },
                    text: {
                        primary: '#1e293b', // Slate 800
                        secondary: '#64748b', // Slate 500
                    },
                }
                : {
                    // Dark mode palette
                    background: {
                        default: '#0f172a', // Slate 900
                        paper: '#1e293b', // Slate 800
                    },
                    text: {
                        primary: '#f8fafc', // Slate 50
                        secondary: '#94a3b8', // Slate 400
                    },
                }),
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 700,
            },
            h3: {
                fontWeight: 600,
            },
            button: {
                textTransform: 'none',
                fontWeight: 600,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        ...(mode === 'dark' && {
                            backgroundColor: '#1e293b', // Ensure cards match dark theme
                            backgroundImage: 'none', // Remove default gradient overlay
                        }),
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarColor: mode === 'dark' ? '#6b7280 #1f2937' : '#9ca3af #f3f4f6',
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            backgroundColor: mode === 'dark' ? '#1f2937' : '#f3f4f6',
                            width: '8px',
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            backgroundColor: mode === 'dark' ? '#6b7280' : '#9ca3af',
                            minHeight: 24,
                        },
                    },
                },
            },
        },
    });
};
