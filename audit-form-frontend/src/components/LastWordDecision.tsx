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
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

import { Colors } from './ContactInfo';

export interface LastWordDecisionProps {
    formData: {
        lastWord_5: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
}

const decisionOptions = [
    { value: 'childWins', label: 'Почти всегда ребёнок получает то, что хочет' },
    { value: 'negotiate', label: 'Мы договариваемся, но последнее слово за мной' },
    { value: 'adultsOnly', label: 'Всё решают взрослые без обсуждения с ребёнком' },
];

const LastWordDecision: React.FC<LastWordDecisionProps> = ({
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
                    5
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Как часто решения в семье принимаются с учётом мнения ребёнка?
                </Typography>
            </Box>

            <RadioGroup
                name="lastWord_5"
                value={formData.lastWord_5 || ''}
                onChange={handleInputChange}
            >
                {decisionOptions.map((option) => (
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
                        sx={{ color: colors.text.primary }}
                    />
                ))}
            </RadioGroup>
        </Paper>
    );
};

export default LastWordDecision;