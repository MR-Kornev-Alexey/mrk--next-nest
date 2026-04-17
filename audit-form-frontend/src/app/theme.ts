'use client';
import { createTheme, alpha } from '@mui/material/styles';

export const colors = {
    background: '#FCF9F3',
    paper: '#FFFFFF',
    text: {
        primary: '#3E2F28',
        secondary: '#5A4A3E',
        light: '#A67C52',
    },
    accent: {
        primary: '#D95D2B',
        secondary: '#A67C52',
        light: alpha('#D95D2B', 0.1),
    },
    border: alpha('#A67C52', 0.2),
};

const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: colors.background,
            paper: colors.paper,
        },
        text: {
            primary: colors.text.primary,
            secondary: colors.text.secondary,
        },
        primary: {
            main: colors.accent.primary,
        },
        secondary: {
            main: colors.accent.secondary,
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                        borderColor: colors.border,
                    },
                    '&:hover fieldset': {
                        borderColor: colors.accent.primary,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: colors.accent.primary,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: colors.text.light,
                    '&.Mui-focused': {
                        color: colors.accent.primary,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: colors.accent.primary,
                        color: '#FFFFFF',
                        fontWeight: 700,
                        '&:hover': {
                            backgroundColor: alpha(colors.accent.primary, 0.8),
                        },
                        '&.Mui-disabled': {
                            backgroundColor: alpha(colors.accent.primary, 0.3),
                            color: '#FFFFFF',
                        },
                    },
                },
            ],
        },
    },
});

export { theme };