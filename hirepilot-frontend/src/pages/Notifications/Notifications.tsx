import React, { useState, useMemo, useEffect } from 'react';
import { Bell, Briefcase, MessageSquare, Settings, CheckCircle2, Trash2, RotateCcw } from 'lucide-react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import Dropdown from '../../components/Dropdown/Dropdown';
import type { Notification } from '../../data/notificationsData';
import EmptyState from '../../components/EmptyState/EmptyState';
import NotificationItem from './NotificationItem/NotificationItem';
import Loading from '../../components/Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { notificationActions } from '../../store/Notification/notification.slice';
import { NOTIFICATION_SERVICE } from '../../api/services/notificationApi';

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [lastDeleted, setLastDeleted] = useState<Notification | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'unread'>('recent');
  const [actionLoading, setActionLoading] = useState(false);

  const { notifications, loading, hasFetched } = useAppSelector(state => state.notification);
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

  const filteredNotifications = useMemo(() => {
    let filtered = filter === 'all' ? notifications : notifications.filter((n: Notification) => !n.isRead);

    if (sortBy === 'unread') {
      filtered = [...filtered].sort((_a, b) => (b.isRead ? -1 : 1));
    }
    return filtered;
  }, [notifications, filter, sortBy]);

  const unreadCount = useMemo(() => notifications.filter((n: Notification) => !n.isRead).length, [notifications]);

  const stats = useMemo(() => ({
    total: notifications.length,
    unread: unreadCount,
  }), [notifications, unreadCount]);

  const handleMarkAsRead = (id: string): void => {
    NOTIFICATION_SERVICE.markAsRead(id).then(() => {
      dispatch(notificationActions.markAsRead(id));
    });
  };

  const handleMarkAllAsRead = (): void => {
    setActionLoading(true);
    NOTIFICATION_SERVICE.markAllAsRead().then(() => {
      dispatch(notificationActions.markAllAsRead());
    }).finally(() => {
      setActionLoading(false);
    });
  };

  const handleDeleteNotification = (id: string): void => {
    const target = notifications.find((n: Notification) => n.id === id);
    if (target) {
      setLastDeleted(target);
      setShowUndo(true);
      NOTIFICATION_SERVICE.deleteNotification(id).then(() => {
        dispatch(notificationActions.deleteNotification(id));
      });
    }
  };

  const undoDelete = (): void => {
    if (lastDeleted) {
      dispatch(notificationActions.addNotification(lastDeleted));
      setShowUndo(false);
      setLastDeleted(null);
    }
  };

  const clearAll = (): void => {
    setActionLoading(true);
    NOTIFICATION_SERVICE.clearAll().then(() => {
      dispatch(notificationActions.clearNotification());
    }).finally(() => {
      setActionLoading(false);
    });
  };

  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => setShowUndo(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  const getIcon = (type: Notification['type']): React.ReactNode => {
    const props = { size: 24, strokeWidth: 2 };
    const iconMap: Record<Notification['type'], React.ReactNode> = {
      job: <Briefcase {...props} />,
      message: <MessageSquare {...props} />,
      system: <Settings {...props} />,
    };
    return iconMap[type] || <Bell {...props} />;
  };

  const sortOptions = [
    { value: 'recent' as const, label: 'Most Recent' },
    { value: 'unread' as const, label: 'Unread First' },
  ];

  return (
    <div className="min-h-screen py-8 md:py-10 bg-white dark:bg-[#0f172a] relative overflow-x-hidden">
      {/* Decorative Background */}
      <div className="absolute w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] blur-[120px] z-0 opacity-10 rounded-full top-[-200px] right-[-100px] bg-secondary pointer-events-none" />
      <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] blur-[120px] z-0 opacity-10 rounded-full top-[-200px] left-[-100px] bg-primary pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl px-4 relative z-1">
        <div className="mb-6">
          <VisualHeader
            badge={stats.unread > 0 ? `Activity Feed • ${stats.unread} New` : "Activity Feed"}
            title="Stay Updated"
            gradient_title="with Alerts"
            subtitle="Manage your notifications and track job updates in one place."
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mb-4">
          {/* Filter Tabs */}
          <div className="flex gap-1 p-0.5 rounded-3xl backdrop-blur-[10px] border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#1a1d23]/50 w-fit">
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-3 py-1 rounded-[10px] font-bold capitalize transition-all duration-200
                  ${filter === f
                    ? 'bg-primary text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-primary/10'
                  }
                `}
              >
                {f}
                <span
                  className={`
                    ml-1 px-1.5 py-0.5 text-[0.7rem] font-extrabold rounded
                    ${filter === f
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/10 text-primary'
                    }
                  `}
                >
                  {f === 'all' ? stats.total : stats.unread}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={(val) => setSortBy(val as 'recent' | 'unread')}
              className="w-40"
            />

            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0 || actionLoading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold text-sm text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/10 transition-all disabled:opacity-40"
            >
              <CheckCircle2 size={16} />
              Mark all read
            </button>

            <button
              onClick={clearAll}
              disabled={notifications.length === 0 || actionLoading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-40"
            >
              {actionLoading ? (
                <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              {actionLoading ? 'Clearing...' : 'Clear all'}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loading />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <EmptyState
              title="No notifications yet"
              description={filter === 'unread' ? "You've read everything! Check 'All' for history." : "We'll notify you here when there's activity."}
            />
          ) : (
            <div className="flex flex-col gap-0">
              {filteredNotifications.map((n: Notification) => (
                <NotificationItem
                  key={n.id}
                  n={n}
                  getIcon={getIcon}
                  onDelete={handleDeleteNotification}
                  onRead={handleMarkAsRead}
                />
              ))}
            </div>
          )}
        </div>

        {/* Undo Snackbar */}
        {showUndo && (
          <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 animate-[slideDown_0.3s_ease-out]">
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1d23] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notification removed</span>
              <button
                onClick={undoDelete}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-primary text-white text-[0.8rem] font-bold hover:bg-primary-dark transition-all"
              >
                <RotateCcw size={14} />
                Undo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
