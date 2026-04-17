'use client';

import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';

import { Colors } from './ContactInfo'; // или импортируйте из вашего файла с типами

export interface HaveQuestionsProps {
    colors: Colors;
}

const HaveQuestions: React.FC<HaveQuestionsProps> = ({ colors }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: colors.paper,
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                mt: 4,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 3,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        backgroundColor: colors.accent.primary,
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <HelpOutlinedIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            color: colors.text.primary,
                            fontWeight: 600,
                            mb: 0.5,
                        }}
                    >
                        Остались вопросы?
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Мы на связи в WhatsApp — напишите или позвоните (Алексей Корнев)
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/4917625187846"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 30,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
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

export default HaveQuestions;