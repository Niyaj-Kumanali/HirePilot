import { useState, useRef, useEffect, useCallback } from "react";
import { Bell } from "lucide-react";
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
        <div ref={notificationRef} className="relative flex items-center">
            <button
                onClick={toggleNotification}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                aria-label="Toggle notifications"
            >
                {unreadNotificationCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none px-1">
                        {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                    </span>
                )}
                <Bell size={20} />
            </button>

            {isNotificationOpen && (
                <div className="absolute top-[50px] right-0 z-10 max-sm:-right-[30px] sm:right-[10px] md:right-0">
                    <NotificationsBadge setIsNotificationOpen={setIsNotificationOpen} />
                </div>
            )}
        </div>
    );
};

export default NotificationSection;
