'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Paper,
    Avatar,
    FormHelperText,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

// Типы (импортируйте или определите локально)
import { Colors, TextFieldStyles } from './ContactInfo';

export interface CaregiversInfoProps {
    formData: {
        caregivers_3_1: string[];
        caregiversOther_3_2: string;
    };
    handleCheckboxGroupChange: (fieldName: string, value: string[]) => void; // было string, оставляем
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onValidationChange?: (isValid: boolean) => void;
}

const caregiverOptions = [
    { value: 'nanny', label: 'Няня / гувернант' },
    { value: 'grandparents', label: 'Бабушки / дедушки' },
    { value: 'tutors', label: 'Репетиторы / тренеры' },
    { value: 'parentsOnly', label: 'Только родители' },
    { value: 'other', label: 'Другое' },
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

const CaregiversInfo: React.FC<CaregiversInfoProps> = ({
                                                           formData,
                                                           handleCheckboxGroupChange,
                                                           handleInputChange,
                                                           colors,
                                                           textFieldStyles,
                                                           onValidationChange,
                                                       }) => {
    const selectedCaregivers = formData.caregivers_3_1 || [];
    const showOtherField = selectedCaregivers.includes('other');
    const [otherError, setOtherError] = useState<string>('');

    const handleCaregiverChange = (value: string) => {
        let newSelection: string[];
        if (selectedCaregivers.includes(value)) {
            newSelection = selectedCaregivers.filter((v) => v !== value);
            if (value === 'other') {
                handleInputChange({
                    target: { name: 'caregiversOther_3_2', value: '' },
                } as React.ChangeEvent<HTMLInputElement>);
                setOtherError('');
                onValidationChange?.(true);
            }
        } else {
            newSelection = [...selectedCaregivers, value];
        }
        handleCheckboxGroupChange('caregivers_3_1', newSelection);
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
                    3
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Кто, помимо вас, регулярно участвует в воспитании ребёнка?
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <PeopleIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Выберите все подходящие варианты
            </Typography>

            <FormGroup>
                {caregiverOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        control={
                            <Checkbox
                                checked={selectedCaregivers.includes(option.value)}
                                onChange={() => handleCaregiverChange(option.value)}
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
            </FormGroup>

            {showOtherField && (
                <>
                    <TextField
                        fullWidth
                        label="Уточните, кто ещё"
                        name="caregiversOther_3_2"
                        value={formData.caregiversOther_3_2 || ''}
                        onChange={handleOtherChange}
                        placeholder="Например: старший брат, соседка"
                        variant="outlined"
                        error={!!otherError}
                        sx={{ mt: 2, ...textFieldStyles }}
                    />
                    {otherError && (
                        <FormHelperText error sx={{ mt: 0.5 }}>
                            {otherError}
                        </FormHelperText>
                    )}
                </>
            )}
        </Paper>
    );
};

export default CaregiversInfo;