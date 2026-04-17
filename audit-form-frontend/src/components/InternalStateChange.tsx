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
import MoodIcon from '@mui/icons-material/Mood';

import { Colors, TextFieldStyles } from './ContactInfo';

export interface InternalStateChangeProps {
    formData: {
        internalStateChange_13: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onValidationChange?: (isValid: boolean) => void;
}

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

const InternalStateChange: React.FC<InternalStateChangeProps> = ({
                                                                     formData,
                                                                     handleInputChange,
                                                                     colors,
                                                                     textFieldStyles,
                                                                     onValidationChange,
                                                                 }) => {
    const [error, setError] = useState<string>('');
    const [charCount, setCharCount] = useState<number>(
        formData.internalStateChange_13?.length || 0
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
                    13
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Ваше внутреннее состояние
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <MoodIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Что должно измениться в вашем внутреннем состоянии, уровне усталости, уверенности, чтобы вы почувствовали: «Я справляюсь, и мне стало легче»?
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={5}
                name="internalStateChange_13"
                value={formData.internalStateChange_13 || ''}
                onChange={handleChange}
                placeholder="Опишите желаемые изменения в себе..."
                variant="outlined"
                slotProps={{ htmlInput: { maxLength: 2000 } }}
                error={!!error}
                helperText={error}
                sx={textFieldStyles}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <FormHelperText sx={{ color: charCount >= 2000 ? 'error.main' : colors.text.light }}>
                    {charCount}/2000
                </FormHelperText>
            </Box>
        </Paper>
    );
};

export default InternalStateChange;