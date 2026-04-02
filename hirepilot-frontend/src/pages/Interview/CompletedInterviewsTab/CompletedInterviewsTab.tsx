import { FileText } from 'lucide-react';
import type { CompletedInterview } from '../../../types/interview';
import { Box, Card, Typography, Stack, useTheme, alpha } from '@mui/material';

interface CompletedInterviewsTabProps {
  interviews: CompletedInterview[];
}

const CompletedInterviewsTab = ({ interviews }: CompletedInterviewsTabProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {interviews.map((interview) => (
        <Card
          key={interview.id}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {interview.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {interview.company} • {interview.position}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.success.main, 0.1),
                border: `3px solid ${theme.palette.success.main}`,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="success.main">
                {interview.score}%
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              p: 2,
              borderRadius: 1.5,
              bgcolor: alpha(theme.palette.background.default, 0.5),
              mb: 2,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <FileText size={16} />
              <Typography variant="caption" fontWeight={700} textTransform="uppercase">
                Feedback
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "{interview.feedback}"
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {interview.date}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              by {interview.interviewer}
            </Typography>
          </Stack>
        </Card>
      ))}
    </Box>
  );
};

export default CompletedInterviewsTab;