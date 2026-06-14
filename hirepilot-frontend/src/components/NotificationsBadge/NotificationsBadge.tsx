import React, { useState, useEffect, Fragment } from 'react';
import { notificationActions } from '../../store/Notification/notification.slice';
import { NOTIFICATION_SERVICE } from '../../api/services/notificationApi';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { X } from 'lucide-react';

interface NotificationsBadgeProps {
    setIsNotificationOpen: (value: boolean) => void;
}

const NotificationsBadge: React.FC<NotificationsBadgeProps> = ({ setIsNotificationOpen }) => {
    const { notifications, loading, hasFetched } = useAppSelector(state => state.notification);
    const [actionLoading, setActionLoading] = useState(false);
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
        <div
            className="w-[360px] max-h-[520px] overflow-hidden rounded-2xl border border-gray-200/10 dark:border-gray-700/10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-[20px] flex flex-col shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]"
        >
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">Notifications</span>
                <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                        <button
                            className="text-xs text-primary hover:text-primary/80 transition-colors bg-transparent border-none cursor-pointer"
                            onClick={handleClearAll}
                            disabled={actionLoading}
                        >
                            {actionLoading ? 'Clearing...' : 'Clear All'}
                        </button>
                    )}
                    <button
                        className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors bg-transparent border-none cursor-pointer"
                        onClick={() => setIsNotificationOpen(false)}
                        aria-label="Close notifications"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                    <div className="p-8 flex justify-center items-center flex-col gap-3">
                        <div className="w-7 h-7 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Loading notifications...</span>
                    </div>
                ) : notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <Fragment key={notification.id}>
                            <button
                                className="w-full flex flex-col items-start gap-1 px-4 py-3 text-left bg-transparent border-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                style={{ backgroundColor: notification.isRead ? undefined : 'rgba(168,85,247,0.04)' }}
                                onClick={() => handleMarkAsRead(notification.id)}
                            >
                                <div className="flex items-center gap-1.5 w-full">
                                    {!notification.isRead && (
                                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                    )}
                                    <span className={`text-sm ${notification.isRead ? 'font-medium' : 'font-bold'} text-gray-900 dark:text-gray-100`}>
                                        {notification.title}
                                    </span>
                                </div>
                                <span className={`text-xs text-gray-500 dark:text-gray-400 ${notification.isRead ? '' : 'pl-[18px]'}`}>
                                    {notification.description}
                                </span>
                                <span className={`text-xs text-gray-400 dark:text-gray-500 ${notification.isRead ? '' : 'pl-[18px]'} mt-0.5`}>
                                    {notification.time}
                                </span>
                            </button>
                            {index < notifications.length - 1 && <hr className="border-gray-100 dark:border-gray-700/50 mx-4" />}
                        </Fragment>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            No new notifications
                        </span>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-primary/[0.02]">
                <RouterLink
                    to="/notifications"
                    className="block w-full text-center text-sm font-bold text-primary no-underline py-1.5 rounded hover:bg-primary/5 transition-colors"
                    onClick={() => setIsNotificationOpen(false)}
                >
                    View all notifications
                </RouterLink>
            </div>
        </div>
    );
};

export default NotificationsBadge;
