'use client';

import React, { useState, ChangeEvent } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Avatar,
    alpha,
    MenuItem,
} from '@mui/material';

// Типы
export interface Colors {
    paper: string;
    border: string;
    accent: {
        primary: string;
        secondary: string;
        light: string;
    };
    text: {
        primary: string;
        secondary: string;
        light: string;
    };
}

export type TextFieldStyles = {
    '& .MuiOutlinedInput-root': object;
    '& .MuiInputLabel-root': object;
    '& .MuiInputLabel-root.Mui-focused': object;
};

export interface ContactInfoFormData {
    name: string;
    email: string;
    emailConfirm: string;
    messenger: string;
    messengerAccount: string;
    contactTime_1: string;
}

export interface ContactInfoProps {
    formData: ContactInfoFormData;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    colors: Colors;
    textFieldStyles: TextFieldStyles;
    onMessengerChange: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
                                                     formData,
                                                     handleInputChange,
                                                     colors,
                                                     textFieldStyles,
                                                     onMessengerChange,
                                                 }) => {
    const [emailError, setEmailError] = useState<string>('');
    const [emailConfirmError, setEmailConfirmError] = useState<string>('');

    const validateEmail = (email: string): string => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email обязателен';
        if (!re.test(email)) return 'Введите корректный email';
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'email') {
            const error = validateEmail(value);
            setEmailError(error);
            // При изменении email также перепроверяем подтверждение, если оно уже введено
            if (formData.emailConfirm) {
                setEmailConfirmError(value !== formData.emailConfirm ? 'Email не совпадает' : '');
            }
        }

        if (name === 'emailConfirm') {
            setEmailConfirmError(value !== formData.email ? 'Email не совпадает' : '');
        }

        if (name === 'messenger') {
            onMessengerChange();
        }

        handleInputChange(e);
    };

    const showMessengerAccount = Boolean(formData.messenger?.trim() !== '');
    const isTelegram = formData.messenger === 'Telegram';

    const messengerOptions = [
        { value: 'WhatsApp', label: 'WhatsApp' },
        { value: 'Telegram', label: 'Telegram' },
        { value: 'Max', label: 'Max' },
        { value: 'VK', label: 'VK' },
        { value: 'Imo', label: 'Imo' },
        { value: 'Phone', label: 'Сотовый (звонок/смс)' },
    ];

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
                    1
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Контактные данные
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ width: { xs: '100%', md: `calc(33.333% - 16px)` } }}>
                    <TextField
                        fullWidth
                        label="Ваше имя *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Имя"
                        variant="outlined"
                        required
                        sx={textFieldStyles}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', md: `calc(33.333% - 16px)` } }}>
                    <TextField
                        fullWidth
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        variant="outlined"
                        required
                        error={!!emailError}
                        helperText={emailError}
                        sx={textFieldStyles}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', md: `calc(33.333% - 16px)` } }}>
                    <TextField
                        fullWidth
                        label="Подтвердите Email *"
                        name="emailConfirm"
                        type="email"
                        value={formData.emailConfirm}
                        onChange={handleChange}
                        placeholder="повторите email"
                        variant="outlined"
                        required
                        error={!!emailConfirmError}
                        helperText={emailConfirmError}
                        sx={textFieldStyles}
                    />
                </Box>

                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            md: showMessengerAccount ? `calc(33.333% - 16px)` : `calc(50% - 12px)`,
                        },
                    }}
                >
                    <TextField
                        select
                        fullWidth
                        label="Удобный мессенджер *"
                        name="messenger"
                        value={formData.messenger}
                        onChange={handleChange}
                        required
                        sx={textFieldStyles}
                    >
                        {messengerOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                {showMessengerAccount && (
                    <Box sx={{ width: { xs: '100%', md: `calc(33.333% - 16px)` } }}>
                        <TextField
                            fullWidth
                            label={isTelegram ? 'Ваш аккаунт Telegram *' : 'Ваш номер телефона *'}
                            name="messengerAccount"
                            value={formData.messengerAccount || ''}
                            onChange={handleChange}
                            placeholder={isTelegram ? '@username' : '+7 999 123-45-67'}
                            variant="outlined"
                            required
                            sx={textFieldStyles}
                        />
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography sx={{ color: colors.text.primary, mb: 1 }}>
                    В какое время вам удобно провести созвон? Время МСК
                </Typography>
                <RadioGroup
                    row
                    name="contactTime_1"
                    value={formData.contactTime_1}
                    onChange={handleChange}
                    sx={{ flexWrap: 'wrap', gap: 2 }}
                >
                    {[
                        { value: 'morning', label: '🌅 Утро (9:00–12:00)' },
                        { value: 'day', label: '☀️ День (12:00–18:00)' },
                        { value: 'evening', label: '🌙 Вечер (18:00–22:00)' },
                    ].map((option) => (
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
                                backgroundColor: alpha(colors.accent.light, 0.3),
                                borderRadius: 4,
                                px: 2,
                                py: 0.5,
                                m: 0,
                                border: '1px solid',
                                borderColor: colors.border,
                                '& .MuiFormControlLabel-label': { color: colors.text.primary },
                            }}
                        />
                    ))}
                </RadioGroup>
            </Box>
        </Paper>
    );
};

export default ContactInfo;