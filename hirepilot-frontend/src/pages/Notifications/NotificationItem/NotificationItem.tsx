import { Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import type { Notification } from '../../../data/notificationsData';
import { Card, Box, Typography, IconButton, Stack, Collapse, useTheme, alpha, Tooltip } from '@mui/material';

interface NotificationItemProps {
  n: Notification;
  getIcon: (type: Notification['type']) => React.ReactNode;
  onDelete: (id: string) => void;
  onRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ n, getIcon, onDelete, onRead }) => {
  const theme = useTheme();

  const handleNotificationClick = () => {
    if (!n.isRead) {
      onRead(n.id);
    }
    // Logic for redirection could be added here based on notification type
    console.log(`Navigating to details for ${n.type}: ${n.id}`);
  };

  return (
    <Collapse in={true} timeout={300}>
      <Card
        onClick={handleNotificationClick}
        sx={{
          mb: 2,
          p: 2.5,
          borderRadius: '24px',
          bgcolor: n.isRead ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.75),
          backdropFilter: 'blur(16px)',
          border: '1px solid',
          borderColor: n.isRead ? alpha(theme.palette.divider, 0.05) : alpha(theme.palette.primary.main, 0.2),
          boxShadow: n.isRead ? 'none' : theme.shadows[2],
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          gap: 2.5,
          alignItems: 'flex-start',
          '&:hover': {
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
            borderColor: alpha(theme.palette.primary.main, 0.3),
            '& .chevron-icon': {
              opacity: 1,
              transform: 'translateX(4px)',
              color: 'primary.main',
            },
            '& .card-icon': {
              transform: 'rotate(-5deg) scale(1.05)',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
            }
          },
          ...(n.isRead === false && {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.05)}, transparent 70%)`,
              pointerEvents: 'none',
            }
          })
        }}
      >
        {/* Icon */}
        <Box
          className="card-icon"
          sx={{
            width: 52,
            height: 52,
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            color: 'text.secondary',
            transition: 'all 0.4s ease',
            flexShrink: 0,
            boxShadow: theme.shadows[1],
          }}
        >
          {getIcon(n.type)}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0, pt: 0.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 0.5 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" fontWeight={800} sx={{ fontSize: '1.1rem', lineHeight: 1.2, mb: 0.5, color: 'text.primary' }}>
                {n.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                  fontSize: '0.95rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {n.description}
              </Typography>
            </Box>

            <Stack alignItems="flex-end" spacing={0.5} flexShrink={0}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ opacity: 0.7 }}>
                {n.time}
              </Typography>
              <ChevronRight className="chevron-icon" size={16} style={{ transition: 'all 0.3s ease', opacity: 0.3 }} />
            </Stack>
          </Stack>
        </Box>

        {/* Actions */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 0.5 }}>
          {!n.isRead && (
            <Tooltip title="Mark as read">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onRead(n.id);
                }}
                size="small"
                sx={{
                  color: 'text.secondary',
                  bgcolor: alpha(theme.palette.text.secondary, 0.05),
                  borderRadius: '12px',
                  p: 1,
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <CheckCircle2 size={18} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Delete">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(n.id);
              }}
              size="small"
              sx={{
                color: 'text.secondary',
                bgcolor: alpha(theme.palette.text.secondary, 0.05),
                borderRadius: '12px',
                p: 1,
                '&:hover': {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                }
              }}
            >
              <Trash2 size={18} />
            </IconButton>
          </Tooltip>
        </Stack>

        {!n.isRead && (
          <Box
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              display: { xs: 'none', sm: 'block' } // Hide on small screens where layout might be tight, or adjust position
            }}
          />
        )}
      </Card>
    </Collapse>
  );
};

export default NotificationItem;
