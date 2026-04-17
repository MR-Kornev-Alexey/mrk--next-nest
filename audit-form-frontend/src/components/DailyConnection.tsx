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
import ScheduleIcon from '@mui/icons-material/Schedule';

import { Colors } from './ContactInfo';

export interface DailyConnectionProps {
    formData: {
        dailyConnection_11: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
}

const timeOptions = [
    { value: 'up_to_15min', label: 'до 15 минут' },
    { value: '15_30min', label: '15–30 минут' },
    { value: '30_60min', label: '30–60 минут' },
    { value: 'over_60min', label: 'больше часа' },
];

const DailyConnection: React.FC<DailyConnectionProps> = ({
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
                    11
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Время с ребёнком
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Сколько времени в день вы готовы уделять играм и упражнениям с ребёнком?
            </Typography>

            <RadioGroup
                name="dailyConnection_11"
                value={formData.dailyConnection_11 || ''}
                onChange={handleInputChange}
            >
                {timeOptions.map((option) => (
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
                            mb: 1,
                            color: colors.text.primary,
                        }}
                    />
                ))}
            </RadioGroup>
        </Paper>
    );
};

export default DailyConnection;