// components/RegionRestrictionBanner.tsx
'use client';
import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Colors {
    accent: {
        light: string;
        primary: string;
    };
    text: {
        primary: string;
    };
}

interface RegionRestrictionBannerProps {
    colors: Colors;
}

const RegionRestrictionBanner: React.FC<RegionRestrictionBannerProps> = ({ colors }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: colors.accent.light,
                borderRadius: 3,
                p: 2,
                mb: 4,
                border: '1px solid',
                borderColor: colors.accent.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <InfoOutlinedIcon sx={{ color: colors.accent.primary }} />
                <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: 500 }}>
                    Важный момент: форма работает только с российских IP. <br />
                    Если вы находитесь не в России — просто напишите в WhatsApp:
                </Typography>
            </Box>
            <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/4917625187846"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 30,
                    px: 3,
                    '&:hover': {
                        backgroundColor: '#128C7E',
                    },
                }}
            >
                +49 176 251 878 46 (Алексей)
            </Button>
        </Paper>
    );
};

export default RegionRestrictionBanner;