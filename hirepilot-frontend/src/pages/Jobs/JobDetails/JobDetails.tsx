import React, { useEffect } from 'react';
import { X, Briefcase, Building2, Rocket, MapPin, Clock, DollarSign, Users, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type Job from '../../../types/job';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  useTheme,
  alpha,
  Slide
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

interface JobDetailsProps {
  open: boolean;
  job: Job;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobDetails: React.FC<JobDetailsProps> = ({ open, job, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  if (!job) return null;

  const handleStartAIInterview = () => {
    onClose();
    navigate('/interview', { state: { job } });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          '&:hover': {
            bgcolor: alpha(theme.palette.background.paper, 0.95),
          }
        }}
      >
        <X size={24} />
      </IconButton>

      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          p: 4,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
            }}
          >
            <Briefcase size={28} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {job.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Building2 size={16} />
              <Typography variant="body2" color="text.secondary">
                {job.company}
              </Typography>
            </Stack>
          </Box>
          {job.rating && (
            <Chip
              icon={<Star size={16} fill="currentColor" />}
              label={job.rating}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: 'warning.main',
                fontWeight: 700,
              }}
            />
          )}
        </Stack>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        {/* Quick Info */}
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 4 }}>
          {job.location && (
            <Chip
              icon={<MapPin size={18} />}
              label={job.location}
              variant="outlined"
            />
          )}
          {job.salary && (
            <Chip
              icon={<DollarSign size={18} />}
              label={job.salary}
              variant="outlined"
            />
          )}
          {job.type && (
            <Chip
              icon={<Clock size={18} />}
              label={job.type}
              variant="outlined"
            />
          )}
          {job.level && (
            <Chip
              icon={<Users size={18} />}
              label={job.level}
              variant="outlined"
            />
          )}
        </Stack>

        {/* Description Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            About This Role
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {job.description}
          </Typography>
        </Box>

        {/* Skills Section */}
        <Box>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Required Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {job.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: 1.5, px: 3 }}
        >
          Close
        </Button>
        <Button
          variant="outlined"
          startIcon={<Sparkles size={18} />}
          onClick={handleStartAIInterview}
          sx={{
            borderRadius: 1.5,
            px: 3,
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'secondary.dark',
              bgcolor: alpha(theme.palette.secondary.main, 0.05),
            }
          }}
        >
          AI Interview
        </Button>
        <Button
          variant="contained"
          startIcon={<Rocket size={18} />}
          sx={{
            borderRadius: 1.5,
            px: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          Apply Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetails;