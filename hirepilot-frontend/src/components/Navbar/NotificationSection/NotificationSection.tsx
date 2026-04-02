import { useState, useRef, useEffect, useCallback } from "react";
import { Bell } from "lucide-react";
import { IconButton, Badge, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import NotificationsBadge from "../../NotificationsBadge/NotificationsBadge";
import { notificationActions } from "../../../store/Notification/notification.slice";
import { NOTIFICATION_SERVICE } from "../../../api/services/notificationApi";

const NotificationSection = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const unreadNotificationCount = useAppSelector(state => state.notification.unreadNotificationCount);
    const hasFetched = useAppSelector(state => state.notification.hasFetched);
    const notificationRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
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

    const toggleNotification = useCallback(() => {
        setIsNotificationOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isNotificationOpen &&
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isNotificationOpen]);

    return (
        <Box ref={notificationRef} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={toggleNotification}
                color="inherit"
            >
                <Badge badgeContent={unreadNotificationCount} color="error">
                    <Bell size={20} />
                </Badge>
            </IconButton>

            {isNotificationOpen && (
                <Box sx={{ position: 'absolute', top: 50, right: { xs: -30, sm: 10, md: 0, lg: 0 }, zIndex: 10 }}>
                    <NotificationsBadge setIsNotificationOpen={setIsNotificationOpen} />
                </Box>
            )}
        </Box>
    );
};

export default NotificationSection;
