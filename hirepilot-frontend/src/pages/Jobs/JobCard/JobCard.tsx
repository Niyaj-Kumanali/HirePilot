import { MapPin, DollarSign, Clock, TrendingUp, Briefcase, Star, ArrowRight } from 'lucide-react';
import type Job from '../../../types/job';
import { Box, Typography, Stack, useTheme, alpha } from '@mui/material';
import Card from '../../../components/Card/Card';

interface JobCardProps {
    /** The job data object to display. */
    job: Job;
    /** Callback when the user clicks to view job details. */
    onOpen: (job: Job) => void;
}

/**
 * A preview card for a job listing.
 * 
 * Includes job title, company, description summary, location, salary, 
 * and dynamic badges for job type (Remote, Hybrid, etc.).
 */
const JobCard = ({ job, onOpen }: JobCardProps) => {
    const theme = useTheme();

    // Helper for Type Badges
    const getTypeStyles = (type: Job['type']) => {
        const styles: Record<Job["type"], { bg: string; color: string }> = {
            'Full-time': { bg: '#eef2ff', color: '#6366f1' },
            'Part-time': { bg: '#ecfeff', color: '#0891b2' },
            'Contract': { bg: '#fffbeb', color: '#d97706' },
            'Freelance': { bg: '#f0f9ff', color: '#0284c7' },
            'Internship': { bg: '#fdf2f8', color: '#db2777' },
            'Temporary': { bg: '#fefce8', color: '#ca8a04' },
            'Remote': { bg: '#f0fdfa', color: '#0d9488' },
            'Hybrid': { bg: '#f5f3ff', color: '#7c3aed' },
            'On-site': { bg: '#f1f5f9', color: '#334155' },
            'Volunteer': { bg: '#ecfdf5', color: '#059669' },
        };
        return styles[type] || { bg: '#f8fafc', color: '#64748b' };
    };

    const typeStyle = getTypeStyles(job.type);

    return (
        <Card
            onClick={() => onOpen(job)}
            sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    '& .jc-action-bar': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                    '& .jc-action-text': {
                        color: 'primary.main',
                    },
                    '& .jc-arrow': {
                        transform: 'translateX(4px)',
                        color: 'primary.main',
                    }
                }
            }}
        >
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Top Section: Title & Save */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ mb: 1, lineHeight: 1.3, letterSpacing: '-0.02em', fontSize: '1.15rem' }}>
                            {job.title}
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="text.secondary">
                            {job.company}
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.7,
                        fontSize: '0.9rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        m: 0
                    }}
                >
                    {job.description}
                </Typography>

                {/* Middle Section: Meta Grid */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        py: 2.25,
                        borderTop: '1px solid',
                        borderBottom: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.06),
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}>
                        <MapPin size={16} color={theme.palette.primary.main} style={{ opacity: 0.7 }} />
                        <span>{job.location}</span>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}>
                        <DollarSign size={16} color={theme.palette.primary.main} style={{ opacity: 0.7 }} />
                        <span>{job.salary}</span>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}>
                        <Clock size={16} color={theme.palette.primary.main} style={{ opacity: 0.7 }} />
                        <span>{job.posted}</span>
                    </Stack>
                    {job.applicants && (
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>
                            <TrendingUp size={16} color="#059669" />
                            <span>{job.applicants} applied</span>
                        </Stack>
                    )}
                </Box>

                {/* Bottom Section: Tags & Rating */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2.5, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Box
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                px: 1.5,
                                py: 0.75,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.75,
                                bgcolor: typeStyle.bg,
                                color: typeStyle.color,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Briefcase size={12} /> {job.type}
                        </Box>
                        {job.tags.slice(0, 3).map(tag => (
                            <Box
                                key={tag}
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    px: 1.5,
                                    py: 0.75,
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                    borderRadius: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: 'primary.main',
                                    }
                                }}
                            >
                                #{tag}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', gap: 0.25 }}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={job.rating >= i + 1 ? "#6366f1" : "none"}
                                    color={job.rating >= i + 1 ? "#6366f1" : "#e2e8f0"}
                                />
                            ))}
                        </Box>
                        <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ fontSize: '0.85rem' }}>
                            {job.rating}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                className="jc-action-bar"
                sx={{
                    px: 3,
                    py: 2,
                    bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    borderTop: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.05),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <Typography className="jc-action-text" variant="body2" fontWeight={700} color="text.secondary" sx={{ fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                    View position details
                </Typography>
                <ArrowRight className="jc-arrow" size={20} color={theme.palette.primary.main} style={{ transition: 'transform 0.3s ease' }} />
            </Box>
        </Card>
    );
};

export default JobCard;