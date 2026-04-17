'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Paper,
    Avatar,
    FormHelperText,
} from '@mui/material';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';

import { Colors, TextFieldStyles } from './ContactInfo';

export interface ReactionToNoProps {
    formData: {
        reactionToNo_4: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onValidationChange?: (isValid: boolean) => void;
}

// Функция проверки небезопасного содержимого
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

const ReactionToNo: React.FC<ReactionToNoProps> = ({
                                                       formData,
                                                       handleInputChange,
                                                       colors,
                                                       textFieldStyles,
                                                       onValidationChange,
                                                   }) => {
    const [error, setError] = useState<string>('');
    const [charCount, setCharCount] = useState<number>(
        formData.reactionToNo_4?.length || 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCharCount(value.length);

        if (hasUnsafeContent(value)) {
            setError('Текст содержит недопустимые символы или код. Пожалуйста, используйте только обычный текст.');
            onValidationChange?.(false);
        } else {
            setError('');
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
                    4
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Что происходит, когда ребёнок слышит от вас категоричное «Нет»?
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <BatteryAlertIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Опишите ситуацию, которая истощает вас больше всего.
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={5}
                name="reactionToNo_4"
                value={formData.reactionToNo_4 || ''}
                onChange={handleChange}
                placeholder="Опишите типичную ситуацию и ваши чувства..."
                variant="outlined"
                slotProps={{ htmlInput: { maxLength: 2000 } }}
                error={!!error}
                sx={textFieldStyles}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <FormHelperText error={!!error}>
                    {error || ' '}
                </FormHelperText>
                <FormHelperText sx={{ color: charCount >= 2000 ? 'error.main' : colors.text.light }}>
                    {charCount}/2000
                </FormHelperText>
            </Box>

            {charCount > 0 && !error && (
                <Typography variant="caption" sx={{ color: 'success.main', display: 'block', mt: 1 }}>
                    ✓ Текст прошёл проверку безопасности
                </Typography>
            )}
        </Paper>
    );
};

export default ReactionToNo;