'use client';

import React, {useState, ChangeEvent, FormEvent} from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Avatar,
    alpha,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Alert,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SendIcon from '@mui/icons-material/Send';

import {colors} from './theme';
import RegionRestrictionBanner from '@/components/RegionRestrictionBanner';
import ContactInfo from '@/components/ContactInfo';
import ChildInfo from "@/components/ChildInfo";
import CaregiversInfo from "@/components/CaregiversInfo";
import ReactionToNo from "@/components/ReactionToNo";
import LastWordDecision from "@/components/LastWordDecision";
import PreviousExperienceText from "@/components/PreviousExperienceText";
import ParentalFears from "@/components/ParentalFears";
import CharacterTraits from "@/components/CharacterTraits";
import BudgetSelection from "@/components/BudgetSelection";
import ReadinessConfirmation from "@/components/ReadinessConfirmation";
import DailyConnection from "@/components/DailyConnection";
import ExpectedChanges from "@/components/ExpectedChanges";
import InternalStateChange from "@/components/InternalStateChange";
import FinalReview from "@/components/FinalReview";
import WhatNext from "@/components/WhatNext";
import HaveQuestions from "@/components/HaveQuestions";

interface Child {
    name: string;
    age: string;
}

interface FormData {
    consent: boolean;
    name: string;
    email: string;
    emailConfirm: string;
    messenger: string;
    messengerAccount: string;
    contactTime_1: string;
    children_2: Child[]; // <-- добавляем
    caregivers_3_1: string[];        // <-- массив выбранных опций
    caregiversOther_3_2: string;     // <-- текст "Другое"
    reactionToNo_4: string;
    lastWord_5: string;
    previousExperienceText_6: string;
    parentalFears_7: string[];
    parentalFearsOther_7: string;
    characterTraits_8: string[];
    characterTraitsOther_8: string;
    budget_9: string;
    readiness_10: string;
    dailyConnection_11: string;
    expectedChanges_12: string;
    internalStateChange_13: string;
    finalNotes_14: string;
}

export default function HomePage() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [consentChecked, setConsentChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
    const [usersEmail, setUsersEmail] = useState<string | null>(null);
    const [showCredentials, setShowCredentials] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // <-- новое состояние
    const [isCaregiversOtherValid, setIsCaregiversOtherValid] = useState(true);
    const [isReactionToNoValid, setIsReactionToNoValid] = useState(true);
    const [isPrevExpTextValid, setIsPrevExpTextValid] = useState(true);
    const [isParentalFearsOtherValid, setIsParentalFearsOtherValid] = useState(true);
    const [isCharacterTraitsOtherValid, setIsCharacterTraitsOtherValid] = useState(true);
    const [isExpectedChangesValid, setIsExpectedChangesValid] = useState(true);
    const [isInternalStateChangeValid, setIsInternalStateChangeValid] = useState(true);
    const [isFinalNotesValid, setIsFinalNotesValid] = useState(true);

    const [formData, setFormData] = useState<FormData>({
        consent: false,
        name: '',
        email: '',
        emailConfirm: '',
        messenger: '',
        messengerAccount: '',
        contactTime_1: 'day',
        children_2: [],
        caregivers_3_1: [],
        caregiversOther_3_2: '',
        reactionToNo_4: '',
        lastWord_5: '',
        previousExperienceText_6: '',
        parentalFears_7: [],
        parentalFearsOther_7: '',
        characterTraits_8: [],
        characterTraitsOther_8: '',
        budget_9: '',
        readiness_10: '',
        dailyConnection_11: '',
        expectedChanges_12: '',
        internalStateChange_13: '',
        finalNotes_14: '',
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value, type} = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (type === 'checkbox' && name === 'consent') {
            setConsentChecked(checked);
            setFormData((prev) => ({...prev, consent: checked}));
        } else {
            setFormData((prev) => ({...prev, [name]: value}));
        }
    };

    const handleMessengerChange = () => {
        setFormData((prev) => ({...prev, messengerAccount: ''}));
    };

    const handleCheckboxGroupChange = (fieldName: string, value: string[]) => {
        setFormData(prev => ({...prev, [fieldName]: value}));
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); // сбрасываем предыдущую ошибку

        // Валидация
        if (!consentChecked) {
            setErrorMessage('Пожалуйста, дайте согласие на обработку персональных данных');
            return;
        }

        const requiredFields: (keyof FormData)[] = ['name', 'email', 'emailConfirm', 'messenger'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorMessage(`Поле "${field}" обязательно для заполнения`);
                return;
            }
        }

        if (formData.messenger && !formData.messengerAccount) {
            setErrorMessage('Укажите ваш аккаунт / номер в мессенджере');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Введите корректный email');
            return;
        }
        if (formData.email !== formData.emailConfirm) {
            setErrorMessage('Email и подтверждение не совпадают');
            return;
        }
        if (!isCaregiversOtherValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Другое" раздела 3 о воспитателях');
            return;
        }
        if (!isReactionToNoValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Реакция на отказ" раздела 4');
            return;
        }
        if (!isPrevExpTextValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Предыдущий опыт" раздела 6');
            return;
        }
        if (!isParentalFearsOtherValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Другое" раздела 7 о страхах');
            return;
        }
        if (!isCharacterTraitsOtherValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Другое" раздела 8 о чертах характера');
            return;
        }

        if (!isExpectedChangesValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Ожидаемые изменения" раздела 12 ');
            return;
        }
        if (!isInternalStateChangeValid) {
            alert('Пожалуйста, исправьте ошибки в поле "Ваше внутреннее состояние" раздела 13');
            return;
        }
        if (!isFinalNotesValid) {
            alert('Пожалуйста, исправьте ошибки в поле финальных заметок раздела 14');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Авторизация
            const authResponse = await fetch('https://mrk.digital/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                }),
            });

            if (!authResponse.ok) {
                const errorData = await authResponse.json().catch(() => ({}));
                throw new Error(errorData.message || 'Ошибка авторизации');
            }

            const authData = await authResponse.json();
            const token = authData.token;

            if (authData.generatedPassword) {
                setGeneratedPassword(authData.generatedPassword);
                setUsersEmail(formData.email);
                setShowCredentials(true);
            } else {
                setGeneratedPassword(null);
                setShowCredentials(false);
            }
            // https://mrk.digital/api/form/submit
            // 2. Отправка анкеты
            const formResponse = await fetch('https://mrk.digital/api/form/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    messenger: formData.messenger,
                    messengerAccount: formData.messengerAccount,
                    contactTime_1: formData.contactTime_1,
                    children_2: formData.children_2,
                    caregivers_3_1: formData.caregivers_3_1,
                    caregiversOther_3_2: formData.caregiversOther_3_2,
                    reactionToNo_4: formData.reactionToNo_4,
                    lastWord_5: formData.lastWord_5,
                    previousExperienceText_6: formData.previousExperienceText_6,
                    parentalFears_7: formData.parentalFears_7,
                    parentalFearsOther_7: formData.parentalFearsOther_7,
                    characterTraits_8: formData.characterTraits_8,
                    characterTraitsOther_8: formData.characterTraitsOther_8,
                    budget_9: formData.budget_9,
                    readiness_10: formData.readiness_10,
                    dailyConnection_11: formData.dailyConnection_11,
                    expectedChanges_12: formData.expectedChanges_12,
                    internalStateChange_13: formData.internalStateChange_13,
                    finalNotes_14: formData.finalNotes_14,
                }),
            });

            if (!formResponse.ok) {
                const errorData = await formResponse.json().catch(() => ({}));
                throw new Error(errorData.message || 'Ошибка отправки анкеты');
            }

            console.log('Анкета отправлена');
            setOpenSnackbar(true);
            resetForm();
        } catch (error) {
            console.error('Ошибка:', error);
            let userMessage = 'Произошла ошибка. Пожалуйста, попробуйте позже или обратитесь в поддержку.';
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                userMessage = 'Не удалось подключиться к серверу. Проверьте интернет-соединение или напишите нам.';
            } else if (error instanceof Error) {
                userMessage = error.message;
            }
            setErrorMessage(userMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            consent: false,
            name: '',
            email: '',
            emailConfirm: '',
            messenger: '',
            messengerAccount: '',
            contactTime_1: 'day',
            children_2: [],
            caregivers_3_1: [],
            caregiversOther_3_2: '',
            reactionToNo_4: '',
            lastWord_5: '',
            previousExperienceText_6: '',
            parentalFears_7: [],
            parentalFearsOther_7: '',
            characterTraits_8: [],
            characterTraitsOther_8: '',
            budget_9: '',
            readiness_10: '',
            dailyConnection_11: '',
            expectedChanges_12: '',
            internalStateChange_13: '',
            finalNotes_14: '',
        });
        setIsCharacterTraitsOtherValid(true);
        setIsParentalFearsOtherValid(true);
        setConsentChecked(false);
        setIsCaregiversOtherValid(true);
        setIsReactionToNoValid(true);
        setIsPrevExpTextValid(true);
        setIsExpectedChangesValid(true);
        setIsInternalStateChangeValid(true);
        setIsFinalNotesValid(true);
    };

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            color: colors.text.primary,
            '& fieldset': {borderColor: colors.border},
            '&:hover fieldset': {borderColor: colors.accent.primary},
            '&.Mui-focused fieldset': {borderColor: colors.accent.primary},
        },
        '& .MuiInputLabel-root': {color: colors.text.light},
        '& .MuiInputLabel-root.Mui-focused': {color: colors.accent.primary},
    };

    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                minHeight: '100vh',
                py: {xs: 4, md: 6},
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Декоративные фоны */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -100,
                    left: -100,
                    width: '500px',
                    height: '500px',
                    background:
                        'radial-gradient(circle, rgba(217,93,43,0.03) 0%, transparent 70%)',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: '300px',
                    height: '300px',
                    background:
                        'radial-gradient(circle, rgba(166,124,82,0.03) 0%, transparent 70%)',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1}}>
                {/* Заголовок */}
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: colors.paper,
                        borderRadius: 4,
                        p: {xs: 3, md: 4},
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
                            right: 0,
                            height: '6px',
                            background: `linear-gradient(90deg, ${colors.accent.primary}, ${alpha(
                                colors.accent.primary,
                                0.3
                            )})`,
                        }}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap'}}>
                        <Avatar
                            sx={{
                                bgcolor: colors.accent.primary,
                                width: 60,
                                height: 60,
                                color: '#FFFFFF',
                            }}
                        >
                            <PsychologyIcon/>
                        </Avatar>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: colors.text.primary,
                                    fontWeight: 600,
                                    fontSize: {xs: '1.8rem', md: '2.2rem'},
                                }}
                            >
                                Анкета стратегического аудита
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: colors.text.secondary,
                                    mt: 2,
                                    pt: 1,
                                    borderTop: `1px dashed ${colors.border}`,
                                    fontSize: '1rem',
                                    lineHeight: 1.5,
                                }}
                            >
                                Эта анкета поможет мне оценить масштаб вашей ситуации и лучше
                                подготовиться к разговору. Наша цель — не искать виноватых, а
                                выявить системный сбой и найти алгоритм его исправления.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <RegionRestrictionBanner colors={colors}/>



                <form onSubmit={handleSubmit}>
                    {/* Согласие */}
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: colors.paper,
                            borderRadius: 4,
                            p: 3,
                            mb: 4,
                            border: '1px solid',
                            borderColor: colors.accent.secondary,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={consentChecked}
                                    onChange={handleInputChange}
                                    name="consent"
                                    sx={{
                                        color: colors.accent.secondary,
                                        '&.Mui-checked': {color: colors.accent.primary},
                                    }}
                                />
                            }
                            label={
                                <Typography sx={{color: colors.text.primary}}>
                                    Я даю согласие на обработку персональных данных в соответствии с{' '}
                                    <Link
                                        href="https://elenakorneva.ru/privacy"
                                        sx={{
                                            color: '#A67C52 !important',
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                color: 'rgba(166,124,82,0.45) !important',
                                            },
                                        }}
                                    >
                                        Политикой конфиденциальности
                                    </Link>
                                </Typography>
                            }
                        />
                    </Paper>

                    {/* Контактные данные */}
                    <ContactInfo
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onMessengerChange={handleMessengerChange}
                    />
                    <ChildInfo
                        formData={formData}
                        setFormData={setFormData}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                    />
                    <CaregiversInfo
                        formData={formData}
                        handleCheckboxGroupChange={handleCheckboxGroupChange}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsCaregiversOtherValid}
                    />
                    <ReactionToNo
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsReactionToNoValid}
                    />
                    <LastWordDecision
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                    />
                    <PreviousExperienceText
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsPrevExpTextValid}
                    />
                    <ParentalFears
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleCheckboxGroupChange={handleCheckboxGroupChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsParentalFearsOtherValid}
                    />
                    <CharacterTraits
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleCheckboxGroupChange={handleCheckboxGroupChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsCharacterTraitsOtherValid}
                    />
                    <BudgetSelection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                    />
                    {/* Блок 10 */}
                    <ReadinessConfirmation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                    />
                    <DailyConnection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                    />
                    <ExpectedChanges
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsExpectedChangesValid}
                    />
                    <InternalStateChange
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsInternalStateChangeValid}
                    />
                    <FinalReview
                        formData={formData}
                        handleInputChange={handleInputChange}
                        colors={colors}
                        textFieldStyles={textFieldStyles}
                        onValidationChange={setIsFinalNotesValid}
                    />
                    {/* Блок ошибок */}
                    {errorMessage && (
                        <Alert
                            severity="error"
                            sx={{mb: 2}}
                            onClose={() => setErrorMessage(null)}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    {/* Кнопка отправки */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={
                            !consentChecked ||
                            isSubmitting ||
                            !isCaregiversOtherValid ||
                            !isReactionToNoValid ||
                            !isPrevExpTextValid ||
                            !isParentalFearsOtherValid ||
                            !isCharacterTraitsOtherValid ||
                            !isExpectedChangesValid ||
                            !isInternalStateChangeValid ||
                            !isFinalNotesValid
                        }
                        sx={{
                            backgroundColor: colors.accent.primary,
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            py: 2,
                            borderRadius: 4,
                            '&:hover': {
                                backgroundColor: alpha(colors.accent.primary, 0.8),
                            },
                            '&.Mui-disabled': {
                                backgroundColor: alpha(colors.accent.primary, 0.3),
                                color: '#FFFFFF',
                            },
                            mb: 3,
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <CircularProgress size={24} color="inherit" sx={{mr: 1}}/>
                                Отправка...
                            </>
                        ) : (
                            <>
                                Отправить анкету
                                <SendIcon sx={{ml: 1}}/>
                            </>
                        )}
                    </Button>
                </form>

                {/* Учётные данные нового пользователя */}
                {showCredentials && generatedPassword && (
                    <Alert
                        severity="info"
                        sx={{
                            mt: 2,
                            backgroundColor: alpha(colors.accent.primary, 0.1),
                            border: `1px solid ${colors.accent.primary}`,
                            color: colors.text.primary,
                        }}
                        onClose={() => setShowCredentials(false)}
                    >
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Ваш аккаунт создан!
                        </Typography>
                        <Typography variant="body2">
                            Логин (email): <strong>{usersEmail}</strong>
                            <br/>
                            Пароль: <strong>{generatedPassword}</strong>
                        </Typography>
                        <Typography variant="caption" sx={{display: 'block', mt: 1}}>
                            Сохраните эти данные для входа в личный кабинет.
                        </Typography>
                    </Alert>
                )}

                {/* Успешная отправка */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert
                        severity="success"
                        sx={{
                            width: '100%',
                            backgroundColor: colors.paper,
                            color: colors.text.primary,
                            border: `1px solid ${colors.accent.primary}`,
                        }}
                    >
                        Анкета отправлена! Спасибо за доверие.
                    </Alert>
                </Snackbar>
                <WhatNext colors={colors} />
                <HaveQuestions colors={colors} />
            </Container>
        </Box>
    );
}