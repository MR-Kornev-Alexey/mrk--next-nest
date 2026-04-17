'use client';
import React from 'react';
import { Box, Container, Typography, Paper, Avatar } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { alpha } from '@mui/material/styles';

import { colors } from './theme';
import RegionRestrictionBanner from '@/components/RegionRestrictionBanner';

export default function HomePage() {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                minHeight: '100vh',
                py: { xs: 4, md: 6 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Декоративные элементы (статичные) */}
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

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Заголовок (статичный) */}
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: colors.paper,
                        borderRadius: 4,
                        p: { xs: 3, md: 4 },
                        mb: 4,
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

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: colors.accent.primary,
                                width: 60,
                                height: 60,
                                color: '#FFFFFF',
                            }}
                        >
                            <PsychologyIcon />
                        </Avatar>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: colors.text.primary,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                                }}
                            >
                                Анкета стратегического аудита
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: colors.text.secondary,
                                    mt: 2,
                                    pt: 1,
                                    borderTop: `1px dashed ${colors.border}`,
                                    fontStyle: 'normal',
                                    fontSize: '1rem',
                                    lineHeight: 1.5,
                                }}
                            >
                                Эта анкета поможет мне понять вашу ситуацию и подготовиться к разговору
                                так, чтобы сразу попасть в суть. Отвечайте честно — мы не ищем
                                виноватых, мы ищем системный сбой, который можно исправить.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Баннер (всегда показываем) */}
                <RegionRestrictionBanner colors={colors} />

                {/* Здесь будут добавляться остальные компоненты анкеты */}
            </Container>
        </Box>
    );
}