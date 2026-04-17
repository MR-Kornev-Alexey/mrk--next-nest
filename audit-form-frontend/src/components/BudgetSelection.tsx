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
import PaidIcon from '@mui/icons-material/Paid';

import { Colors } from './ContactInfo';

export interface BudgetSelectionProps {
    formData: {
        budget_9: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
}

const budgetOptions = [
    {
        value: 'up_to_50k',
        label: 'до 50 000 ₽',
        description: 'групповой формат (участие в закрытом клубе / группе, общие эфиры, чек-листы, доступ к материалам, без персонального сопровождения)',
    },
    {
        value: '100k_150k',
        label: '100 000 – 150 000 ₽',
        description: 'базовый формат (диагностика, стратегия, регулярные созвоны, моя обратная связь)',
    },
    {
        value: '150k_300k',
        label: '150 000 – 300 000 ₽',
        description: 'полное включение (персональное сопровождение + работа с окружением ребёнка)',
    },
    {
        value: 'over_300k',
        label: 'от 300 000 ₽',
        description: 'VIP-формат (нейроархитектура среды, индивидуальный протокол 24/7)',
    },
];

const BudgetSelection: React.FC<BudgetSelectionProps> = ({
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
                    9
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Бюджет на 90 дней
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <PaidIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Какой бюджет вы готовы инвестировать в систему воспитания на ближайшие 90 дней?
            </Typography>

            <RadioGroup
                name="budget_9"
                value={formData.budget_9 || ''}
                onChange={handleInputChange}
            >
                {budgetOptions.map((option) => (
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
                        label={
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                                    {option.label}
                                </Typography>
                                <Typography variant="body2" sx={{ color: colors.text.light }}>
                                    {option.description}
                                </Typography>
                            </Box>
                        }
                        sx={{
                            alignItems: 'flex-start',
                            mb: 2,
                            '& .MuiFormControlLabel-label': { width: '100%' },
                        }}
                    />
                ))}
            </RadioGroup>
        </Paper>
    );
};

export default BudgetSelection;