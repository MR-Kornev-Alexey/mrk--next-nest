'use client';

import React from 'react';
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Avatar,
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';

import { Colors } from './ContactInfo';

export interface ReadinessConfirmationProps {
    formData: {
        readiness_10: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
}

const readinessOptions = [
    {
        value: 'ready_to_change',
        label: 'Да, я готова менять свои привычные реакции и включаться в процесс.',
    },
    {
        value: 'only_child',
        label: 'Нет, я хочу, чтобы специалист работал только с ребёнком.',
    },
];

const ReadinessConfirmation: React.FC<ReadinessConfirmationProps> = ({
                                                                         formData,
                                                                         handleInputChange,
                                                                         colors,
                                                                     }) => {
    return (
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
                    width: '4px',
                    height: '100%',
                    background: `linear-gradient(180deg, ${colors.accent.primary}, ${colors.accent.secondary})`,
                }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                    sx={{
                        bgcolor: colors.accent.primary,
                        width: 40,
                        height: 40,
                        color: '#FFFFFF',
                        mr: 2,
                        fontSize: '1.2rem',
                    }}
                >
                    10
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Готовность к совместной работе
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <HandshakeIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Ребёнок — отражение системы, которую создают взрослые. Мы будем перестраивать алгоритмы вместе, шаг за шагом. Без чувства вины, но с вашим участием.
            </Typography>

            <Typography variant="body1" sx={{ color: colors.text.primary, mb: 2, fontWeight: 500 }}>
                Вы готовы к работе со мной?
            </Typography>

            <RadioGroup
                name="readiness_10"
                value={formData.readiness_10 || ''}
                onChange={handleInputChange}
            >
                {readinessOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                sx={{
                                    color: colors.accent.secondary,
                                    '&.Mui-checked': { color: colors.accent.primary },
                                }}
                            />
                        }
                        label={option.label}
                        sx={{
                            mb: 2,
                            color: colors.text.primary,
                        }}
                    />
                ))}
            </RadioGroup>
        </Paper>
    );
};

export default ReadinessConfirmation;