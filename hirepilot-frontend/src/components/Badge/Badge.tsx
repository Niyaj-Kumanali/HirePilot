import React from 'react';
import { Chip, alpha, useTheme } from '@mui/material';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    iconLeft?: React.ReactElement; // Chip expects ReactElement for icon
    className?: string;
    onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'secondary',
    size = 'md',
    iconLeft,
    className = '',
    onClick
}) => {
    const theme = useTheme();

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                };
            case 'secondary':
                return {
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                };
            case 'outline':
                return {
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'primary.main',
                };
            case 'ghost':
                return {
                    bgcolor: 'transparent',
                    color: 'text.secondary',
                };
            case 'success':
                return {
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: 'success.main',
                };
            case 'warning':
                return {
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: 'warning.main',
                };
            case 'danger':
                return {
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: 'error.main',
                };
            case 'info':
                return {
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: 'info.main',
                };
            default:
                return {};
        }
    };

    return (
        <Chip
            label={children}
            size={size === 'sm' ? 'small' : 'medium'}
            icon={iconLeft}
            className={className}
            onClick={onClick}
            sx={{
                fontWeight: 700,
                fontSize: size === 'sm' ? '0.7rem' : '0.8rem',
                height: size === 'sm' ? 24 : 32,
                ...getVariantStyles(),
            }}
        />
    );
};

export default Badge;
