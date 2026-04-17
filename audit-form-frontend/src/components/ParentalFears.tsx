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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningIcon from '@mui/icons-material/Warning';

import { Colors, TextFieldStyles } from './ContactInfo';

export interface ParentalFearsProps {
    formData: {
        parentalFears_7: string[];
        parentalFearsOther_7: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheckboxGroupChange: (fieldName: string, value: string[]) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onValidationChange?: (isValid: boolean) => void;
}

const fearOptions = [
    {
        value: 'consumer',
        label: 'Вырастет потребителем, не ценящим то, что имеет',
        icon: '🛍️',
    },
    {
        value: 'business',
        label: 'Не потянет управление бизнесом и не удержит уровень семьи',
        icon: '💼',
    },
    {
        value: 'virtual',
        label: 'Уйдёт в виртуальную реальность (гаджеты, игры)',
        icon: '🎮',
    },
    {
        value: 'motivation',
        label: 'Потеряет мотивацию и не найдет себя',
        icon: '😕',
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

const ParentalFears: React.FC<ParentalFearsProps> = ({
                                                         formData,
                                                         handleInputChange,
                                                         handleCheckboxGroupChange,
                                                         colors,
                                                         textFieldStyles,
                                                         onValidationChange,
                                                     }) => {
    const selectedFears = formData.parentalFears_7 || [];
    const showOtherField = selectedFears.includes('other');
    const [otherError, setOtherError] = useState<string>('');

    const handleFearChange = (value: string) => {
        let newSelection: string[];
        if (selectedFears.includes(value)) {
            newSelection = selectedFears.filter((v) => v !== value);
            if (value === 'other') {
                handleInputChange({
                    target: { name: 'parentalFearsOther_7', value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
                setOtherError('');
                onValidationChange?.(true);
            }
        } else {
            newSelection = [...selectedFears, value];
        }
        handleCheckboxGroupChange('parentalFears_7', newSelection);
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
                    7
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Ваши главные страхи относительно будущего ребёнка
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3, ml: 7 }}>
                <VisibilityOffIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Выберите все подходящие варианты
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                {fearOptions.map((option) => (
                    <Box
                        key={option.value}
                        sx={{
                            width: { xs: '100%', md: `calc(50% - 6px)` },
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedFears.includes(option.value)}
                                    onChange={() => handleFearChange(option.value)}
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
                                    checked={selectedFears.includes('other')}
                                    onChange={() => handleFearChange('other')}
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
                            name="parentalFearsOther_7"
                            value={formData.parentalFearsOther_7 || ''}
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

export default ParentalFears;