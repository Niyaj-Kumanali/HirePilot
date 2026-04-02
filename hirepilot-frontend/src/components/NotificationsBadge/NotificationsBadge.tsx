import React, { useState, useEffect, Fragment } from 'react';
import { notificationActions } from '../../store/Notification/notification.slice';
import { NOTIFICATION_SERVICE } from '../../api/services/notificationApi';
import { alpha, Box, Button, CircularProgress, Divider, IconButton, List, ListItem, ListItemButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { X } from 'lucide-react';

interface NotificationsBadgeProps {
    setIsNotificationOpen: (value: boolean) => void;
}

const NotificationsBadge: React.FC<NotificationsBadgeProps> = ({ setIsNotificationOpen }) => {
    const theme = useTheme();
    const { notifications, loading, hasFetched } = useAppSelector(state => state.notification);
    const [actionLoading, setActionLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Only fetch if we haven't fetched yet
        if (!hasFetched) {
            dispatch(notificationActions.setLoading(true));
            NOTIFICATION_SERVICE.fetchNotifications().then(data => {
                dispatch(notificationActions.setNotifications(data));
            }).catch(err => {
                console.error('Fetch error:', err);
                dispatch(notificationActions.setError(err.message));
            }).finally(() => {
                dispatch(notificationActions.setLoading(false));
            });
        }
    }, [dispatch, hasFetched]);

    const handleClearAll = () => {
        setActionLoading(true);
        NOTIFICATION_SERVICE.clearAll().then(() => {
            dispatch(notificationActions.clearNotification());
        }).finally(() => {
            setActionLoading(false);
        });
    };

    const handleMarkAsRead = (id: string) => {
        NOTIFICATION_SERVICE.markAsRead(id).then(() => {
            dispatch(notificationActions.markAsRead(id));
        });
    };


    return (
        <Paper
            elevation={20}
            sx={{
                width: 360,
                maxHeight: 520,
                overflow: 'hidden',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.1),
                bgcolor: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: `0 24px 48px -12px ${alpha(theme.palette.common.black, 0.25)}`
            }}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={800}>Notifications</Typography>
                <Stack direction="row" spacing={1}>
                    {notifications.length > 0 && (
                        <Button
                            size="small"
                            onClick={handleClearAll}
                            disabled={actionLoading}
                            sx={{ fontSize: '0.75rem', textTransform: 'none' }}
                        >
                            {actionLoading ? 'Clearing...' : 'Clear All'}
                        </Button>
                    )}
                    <IconButton
                        size="small"
                        onClick={() => setIsNotificationOpen(false)}
                        sx={{ color: 'text.secondary' }}
                    >
                        <X size={18} />
                    </IconButton>
                </Stack>
            </Box>

            <List disablePadding sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {loading ? (
                    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                        <CircularProgress size={30} thickness={5} />
                        <Typography variant="caption" color="text.secondary">Loading notifications...</Typography>
                    </Box>
                ) : notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <Fragment key={notification.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        gap: 0.5,
                                        bgcolor: notification.isRead ? 'transparent' : alpha(theme.palette.primary.main, 0.04)
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                                        {!notification.isRead && (
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
                                        )}
                                        <Typography variant="body2" fontWeight={notification.isRead ? 500 : 700} color="text.primary">
                                            {notification.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ pl: notification.isRead ? 0 : 2.5 }}>
                                        {notification.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.disabled" sx={{ pl: notification.isRead ? 0 : 2.5, mt: 0.5 }}>
                                        {notification.time}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                            {index < notifications.length - 1 && <Divider component="li" />}
                        </Fragment>
                    ))
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No new notifications
                        </Typography>
                    </Box>
                )}
            </List>

            <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Button
                    component={RouterLink}
                    to="/notifications"
                    fullWidth
                    variant="text"
                    size="small"
                    onClick={() => setIsNotificationOpen(false)}
                    sx={{ fontWeight: 700, textTransform: 'none' }}
                >
                    View all notifications
                </Button>
            </Box>
        </Paper>
    );
};

export default NotificationsBadge;