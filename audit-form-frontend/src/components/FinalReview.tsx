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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Colors, TextFieldStyles } from './ContactInfo';

export interface FinalReviewProps {
    formData: {
        finalNotes_14: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onValidationChange?: (isValid: boolean) => void;
}

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

const FinalReview: React.FC<FinalReviewProps> = ({
                                                     formData,
                                                     handleInputChange,
                                                     colors,
                                                     textFieldStyles,
                                                     onValidationChange,
                                                 }) => {
    const [error, setError] = useState<string>('');
    const [charCount, setCharCount] = useState<number>(
        formData.finalNotes_14?.length || 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCharCount(value.length);

        if (hasUnsafeContent(value)) {
            setError('Текст содержит недопустимые символы или код. Используйте обычный текст.');
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
                    14
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Если есть что-то важное, что не вошло в анкету, напишите здесь
                </Typography>
            </Box>

            <TextField
                fullWidth
                multiline
                rows={4}
                name="finalNotes_14"
                value={formData.finalNotes_14 || ''}
                onChange={handleChange}
                placeholder="Здесь можно добавить то, что осталось за кадром..."
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

export default FinalReview;