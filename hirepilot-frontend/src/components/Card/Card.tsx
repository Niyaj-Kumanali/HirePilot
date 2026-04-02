import React from 'react';
import { Card as MuiCard, type CardProps as MuiCardProps, alpha, useTheme } from '@mui/material';

interface CardProps extends MuiCardProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, sx, ...props }) => {
    const theme = useTheme();
    const isClickable = !!onClick;

    return (
        <MuiCard
            className={className}
            onClick={onClick}
            sx={{
                background: alpha(theme.palette.background.paper, 0.7),
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: theme.palette.mode === 'light'
                    ? alpha(theme.palette.common.white, 0.6)
                    : alpha(theme.palette.common.white, 0.1),
                p: 3,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: isClickable ? 'pointer' : 'default',
                ...(isClickable && {
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        bgcolor: 'background.paper',
                        borderColor: 'primary.main',
                        boxShadow: theme.shadows[4],
                    }
                }),
                ...sx
            }}
            {...props}
        >
            {children}
        </MuiCard>
    );
};

export default Card;
