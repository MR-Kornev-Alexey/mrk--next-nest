'use client';

import React from 'react';
import { Box, Container, Typography, Button, Paper, alpha } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Link from 'next/link';
import { colors } from './theme';

export default function NotFound() {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Декоративные элементы */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -100,
                    left: -100,
                    width: '500px',
                    height: '500px',
                    background:
                        'radial-gradient(circle, rgba(217,93,43,0.03) 0%, transparent 70%)',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: '300px',
                    height: '300px',
                    background:
                        'radial-gradient(circle, rgba(166,124,82,0.03) 0%, transparent 70%)',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: colors.paper,
                        borderRadius: 4,
                        p: { xs: 4, md: 6 },
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: colors.border,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: `linear-gradient(90deg, ${colors.accent.primary}, ${alpha(
                                colors.accent.primary,
                                0.3
                            )})`,
                        }}
                    />

                    <SentimentDissatisfiedIcon
                        sx={{
                            fontSize: 80,
                            color: colors.accent.primary,
                            mb: 2,
                            opacity: 0.7,
                        }}
                    />

                    <Typography
                        variant="h1"
                        sx={{
                            color: colors.accent.primary,
                            fontWeight: 700,
                            fontSize: { xs: '4rem', md: '6rem' },
                            lineHeight: 1,
                            mb: 2,
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            color: colors.text.primary,
                            fontWeight: 600,
                            mb: 2,
                        }}
                    >
                        Страница не найдена
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: colors.text.secondary,
                            mb: 4,
                        }}
                    >
                        Извините, страница, которую вы ищете, не существует или была
                        перемещена.
                    </Typography>

                    <Button
                        component={Link}
                        href="/"
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon />}
                        sx={{
                            backgroundColor: colors.accent.primary,
                            color: '#FFFFFF',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderRadius: 4,
                            '&:hover': {
                                backgroundColor: alpha(colors.accent.primary, 0.8),
                            },
                        }}
                    >
                        На главную
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}