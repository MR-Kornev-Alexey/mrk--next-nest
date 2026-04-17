'use client';

import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Avatar,
    Paper,
    IconButton,
    Button,
} from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Типы
import { Colors, TextFieldStyles } from './ContactInfo'; // или определите локально

export interface Child {
    name: string;
    age: string;
}

export interface ChildInfoProps {
    formData: {
        children_2: Child[];
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>; // Временное решение, позже заменим на более строгий тип всей формы
    colors: Colors;
    textFieldStyles: TextFieldStyles;
}

const ChildInfo: React.FC<ChildInfoProps> = ({
                                                 formData,
                                                 setFormData,
                                                 colors,
                                                 textFieldStyles,
                                             }) => {
    const handleAddChild = () => {
        const children_2 = formData.children_2 || [];
        setFormData((prev: any) => ({
            ...prev,
            children_2: [...children_2, { name: '', age: '' }],
        }));
    };

    const handleRemoveChild = (index: number) => {
        const children_2 = [...formData.children_2];
        children_2.splice(index, 1);
        setFormData((prev: any) => ({ ...prev, children_2 }));
    };

    const handleChildChange = (index: number, field: keyof Child, value: string) => {
        const children_2 = [...formData.children_2];
        children_2[index][field] = value;
        setFormData((prev: any) => ({ ...prev, children_2 }));
    };

    const children_2 = formData.children_2 || [];

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
                    2
                </Avatar>
                <Typography variant="h5" sx={{ color: colors.text.primary }}>
                    Возраст ребёнка/детей
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: colors.text.light, mb: 3 }}>
                <ChildCareIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                Добавьте имя и возраст каждого ребёнка
            </Typography>

            {children_2.length === 0 ? (
                <Typography
                    variant="body2"
                    sx={{ color: colors.text.light, fontStyle: 'italic', mb: 2 }}
                >
                    Нажмите «Добавить ребёнка», чтобы начать
                </Typography>
            ) : (
                children_2.map((child, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Box sx={{ width: { xs: '100%', sm: `calc(41.666% - 16px)` } }}>
                            <TextField
                                fullWidth
                                label="Имя ребёнка"
                                value={child.name}
                                onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                                placeholder="Имя"
                                variant="outlined"
                                sx={textFieldStyles}
                            />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: `calc(41.666% - 16px)` } }}>
                            <TextField
                                fullWidth
                                label="Возраст"
                                value={child.age}
                                onChange={(e) => handleChildChange(index, 'age', e.target.value)}
                                placeholder="Например: 5 лет"
                                variant="outlined"
                                sx={textFieldStyles}
                            />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: `calc(16.666% - 16px)` } }}>
                            <IconButton
                                onClick={() => handleRemoveChild(index)}
                                sx={{ color: colors.accent.primary }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))
            )}

            <Button
                startIcon={<AddIcon />}
                onClick={handleAddChild}
                sx={{
                    mt: 1,
                    color: colors.accent.primary,
                    borderColor: colors.accent.primary,
                    '&:hover': {
                        borderColor: colors.accent.primary,
                        backgroundColor: colors.accent.light,
                    },
                }}
                variant="outlined"
            >
                Добавить ребёнка
            </Button>
        </Paper>
    );
};

export default ChildInfo;