import { Button as MuiButton, type ButtonProps as MuiButtonProps, alpha } from '@mui/material';
import type { Theme } from '@mui/material/styles';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    iconLeft,
    iconRight,
    fullWidth = false,
    className = '',
    sx,
    ...props
}) => {
    // Custom styles based on variant
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    background: 'linear-gradient(135deg, #a855f7, #7e22ce)', // Matches original purple gradient
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(168, 85, 247, 0.25)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #b06bf9, #8b2ed9)',
                        boxShadow: '0 6px 16px rgba(168, 85, 247, 0.35)',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    }
                };
            case 'secondary':
                return {
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.05),
                    }
                };
            case 'ghost':
                return {
                    bgcolor: 'transparent',
                    color: 'text.secondary',
                    boxShadow: 'none',
                    '&:hover': {
                        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        boxShadow: 'none',
                    }
                };
            case 'danger':
                return {
                    bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.1),
                    color: 'error.main',
                    boxShadow: 'none',
                    '&:hover': {
                        bgcolor: 'error.main',
                        color: 'white',
                        boxShadow: 'none',
                    }
                };
            default:
                return {};
        }
    };

    return (
        <MuiButton
            fullWidth={fullWidth}
            variant={variant === 'ghost' ? 'text' : 'contained'} // Base variant
            size={size}
            startIcon={iconLeft}
            endIcon={iconRight}
            className={className}
            sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                ...getVariantStyles(),
                ...sx
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
