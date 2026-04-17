'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Paper,
    Checkbox,
    FormControlLabel,
    TextField,
    FormHelperText,
    alpha,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WarningIcon from '@mui/icons-material/Warning';

import { Colors, TextFieldStyles } from './ContactInfo';

export interface CharacterTraitsProps {
    formData: {
        characterTraits_8: string[];
        characterTraitsOther_8: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheckboxGroupChange: (fieldName: string, value: string[]) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onValidationChange?: (isValid: boolean) => void;
}

const traitOptions = [
    {
        value: 'selfControl',
        label: 'Самоконтроль (умение следовать правилам и отвечать за свои действия)',
        icon: '🧘',
    },
    {
        value: 'stressResistance',
        label: 'Стрессоустойчивость (способность спокойно принимать отказ без эмоционального срыва)',
        icon: '🛡️',
    },
    {
        value: 'flexibility',
        label: 'Гибкость мышления (умение перестраиваться при смене планов без протеста и крика)',
        icon: '🌀',
    },
    {
        value: 'willAndIndependence',
        label: 'Воля и самостоятельность (умение принимать решения и действовать без постоянной поддержки)',
        icon: '🌱',
    },
];

// Проверка на небезопасное содержимое
const hasUnsafeContent = (text: string): boolean => {
    if (!text) return false;
    const unsafePatterns = [
        /<script\b/i,
        /<\/?[a-z][\s\S]*>/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /&#/i,
        /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b/i,
    ];
    return unsafePatterns.some((pattern) => pattern.test(text));
};

const CharacterTraits: React.FC<CharacterTraitsProps> = ({
                                                             formData,
                                                             handleInputChange,
                                                             handleCheckboxGroupChange,
                                                             colors,
                                                             textFieldStyles,
                                                             onValidationChange,
                                                         }) => {
    const selectedTraits = formData.characterTraits_8 || [];
    const showOtherField = selectedTraits.includes('other');
    const [otherError, setOtherError] = useState<string>('');

    const handleTraitChange = (value: string) => {
        let newSelection: string[];
        if (selectedTraits.includes(value)) {
            newSelection = selectedTraits.filter((v) => v !== value);
            if (value === 'other') {
                handleInputChange({
                    target: { name: 'characterTraitsOther_8', value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
                setOtherError('');
                onValidationChange?.(true);
            }
        } else {
            newSelection = [...selectedTraits, value];
        }
        handleCheckboxGroupChange('characterTraits_8', newSelection);
    };

    const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        if (hasUnsafeContent(value)) {
            setOtherError('Текст содержит недопустимые символы или код. Используйте обычный текст.');
            onValidationChange?.(false);
        } else {
            setOtherError('');
            onValidationChange?.(true);
        }
        handleInputChange(e);
    };

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

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                    8
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Какие черты характера или навыки вы хотели бы сформировать у ребёнка за 90 дней?
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3, ml: 7 }}>
                <StarIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Выберите все подходящие варианты
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                {traitOptions.map((option) => (
                    <Box
                        key={option.value}
                        sx={{
                            width: { xs: '100%', md: `calc(50% - 6px)` },
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedTraits.includes(option.value)}
                                    onChange={() => handleTraitChange(option.value)}
                                    sx={{
                                        color: colors.accent.secondary,
                                        '&.Mui-checked': { color: colors.accent.primary },
                                    }}
                                />
                            }
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography component="span" sx={{ fontSize: '1.2rem' }}>
                                        {option.icon}
                                    </Typography>
                                    <Typography sx={{ color: colors.text.primary, fontSize: '0.95rem' }}>
                                        {option.label}
                                    </Typography>
                                </Box>
                            }
                            sx={{
                                backgroundColor: alpha(colors.accent.light, 0.2),
                                borderRadius: 2,
                                px: 1.5,
                                py: 0.5,
                                m: 0,
                                width: '100%',
                                border: `1px solid ${alpha(colors.border, 0.5)}`,
                            }}
                        />
                    </Box>
                ))}

                {/* Другое */}
                <Box sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                            backgroundColor: alpha(colors.accent.light, 0.2),
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            border: `1px solid ${alpha(colors.border, 0.5)}`,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedTraits.includes('other')}
                                    onChange={() => handleTraitChange('other')}
                                    sx={{
                                        color: colors.accent.secondary,
                                        '&.Mui-checked': { color: colors.accent.primary },
                                    }}
                                />
                            }
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <WarningIcon sx={{ fontSize: 18 }} />
                                    <Typography>Другое:</Typography>
                                </Box>
                            }
                        />
                        <TextField
                            size="small"
                            placeholder="Опишите словами"
                            name="characterTraitsOther_8"
                            value={formData.characterTraitsOther_8 || ''}
                            onChange={handleOtherChange}
                            disabled={!showOtherField}
                            error={!!otherError}
                            helperText={otherError}
                            sx={{
                                flex: 1,
                                minWidth: 200,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#FFFFFF',
                                    '& fieldset': { borderColor: colors.border },
                                    '&:hover fieldset': { borderColor: colors.accent.primary },
                                    '&.Mui-focused fieldset': { borderColor: colors.accent.primary },
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default CharacterTraits;