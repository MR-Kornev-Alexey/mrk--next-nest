'use client';

import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    alpha,
    Divider,
} from '@mui/material';

import { Colors } from './ContactInfo';

export interface WhatNextProps {
    colors: Colors;
}

const WhatNext: React.FC<WhatNextProps> = ({ colors }) => {
    const steps = [
        {
            label: 'Изучение анкеты',
            description: 'Анкета — первый шаг. Я изучу её в течение 24 часов.',
        },
        {
            label: 'Установочный созвон',
            description: 'Бесплатный установочный созвон (15–20 минут) — второй шаг. Если моя система подходит вашей ситуации, я приглашу вас на него. На созвоне мы решим, нужна ли вам платная работа и какой формат подходит.',
        },
        {
            label: 'Честный ответ',
            description: 'Если я не смогу помочь — честно скажу и, возможно, порекомендую другого специалиста. Мне важнее ваш результат.',
        },
        {
            label: 'Ограниченный набор',
            description: 'Я беру в личное ведение только 3 семьи в квартал. Если мест нет — внесу в лист ожидания или предложу альтернативный формат.',
        },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: colors.paper,
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                mt: 4,
                border: `2px solid ${colors.accent.primary}`,
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${colors.paper} 0%, ${alpha(
                    colors.accent.light,
                    0.1
                )} 100%)`,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${colors.accent.primary}, ${
                        colors.accent.secondary
                    }, ${alpha(colors.accent.primary, 0.3)})`,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: -30,
                    right: -30,
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(
                        colors.accent.primary,
                        0.05
                    )} 0%, transparent 70%)`,
                    zIndex: 0,
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: colors.accent.primary,
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            ✓
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                color: colors.text.primary,
                                fontWeight: 700,
                                fontSize: { xs: '1.6rem', md: '2rem' },
                            }}
                        >
                            Что дальше?
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: colors.border }} />

                <Stepper orientation="vertical" sx={{ gap: 2 }}>
                    {steps.map((step, index) => (
                        <Step key={step.label} active={true}>
                            <StepLabel
                                slots={{
                                    stepIcon: () => (
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: colors.accent.primary,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#FFFFFF',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                    ),
                                }}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: colors.text.primary,
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                    },
                                }}
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent
                                sx={{
                                    borderLeftColor: alpha(colors.accent.primary, 0.3),
                                    ml: 1.5,
                                    pl: 3,
                                }}
                            >
                                <Typography sx={{ color: colors.text.secondary }}>
                                    {step.description}
                                </Typography>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Paper>
    );
};

export default WhatNext;