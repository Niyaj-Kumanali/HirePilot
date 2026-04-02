import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Stack, IconButton, Button, alpha, useTheme } from '@mui/material';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const theme = useTheme();

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const glassStyle = {
        bgcolor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        boxShadow: theme.shadows[1],
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            component="nav"
            aria-label="Pagination Navigation"
            sx={{ mt: 8, p: 1 }}
        >
            <IconButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    ...glassStyle,
                    '&:hover': {
                        bgcolor: 'background.paper',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        boxShadow: theme.shadows[4],
                        transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        boxShadow: 'none',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <ChevronLeft size={20} />
            </IconButton>

            <Stack
                direction="row"
                spacing={1}
                sx={{
                    p: 0.75,
                    borderRadius: 4,
                    ...glassStyle,
                    bgcolor: alpha(theme.palette.background.paper, 0.4),
                    backdropFilter: 'blur(4px)',
                }}
            >
                {pages.map(page => (
                    <Button
                        key={page}
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? 'page' : undefined}
                        sx={{
                            minWidth: 40,
                            width: 40,
                            height: 40,
                            borderRadius: 2.5,
                            p: 0,
                            color: currentPage === page ? 'primary.contrastText' : 'text.secondary',
                            bgcolor: currentPage === page ? 'primary.main' : 'transparent',
                            fontWeight: 700,
                            boxShadow: currentPage === page ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
                            '&:hover': {
                                bgcolor: currentPage === page ? 'primary.dark' : alpha(theme.palette.text.primary, 0.05),
                                color: currentPage === page ? 'primary.contrastText' : 'primary.main',
                            }
                        }}
                    >
                        {page}
                    </Button>
                ))}
            </Stack>

            <IconButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    ...glassStyle,
                    '&:hover': {
                        bgcolor: 'background.paper',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        boxShadow: theme.shadows[4],
                        transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        boxShadow: 'none',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <ChevronRight size={20} />
            </IconButton>
        </Stack>
    );
};

export default Pagination;
