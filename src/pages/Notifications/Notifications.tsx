import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Briefcase, MessageSquare, BookOpen, Settings, CheckCircle2, Trash2, RotateCcw } from 'lucide-react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import { notificationsData } from '../../data/notificationsData';
import type { Notification } from '../../data/notificationsData';
import './notifications.scss';
import EmptyState from '../../components/EmptyState/EmptyState';
import NotificationItem from './NotificationItem/NotificationItem';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [lastDeleted, setLastDeleted] = useState<Notification | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'unread'>('recent');

  const filteredNotifications = useMemo(() => {
    let filtered = filter === 'all' ? notifications : notifications.filter(n => !n.isRead);

    if (sortBy === 'unread') {
      filtered = [...filtered].sort((_a, b) => (b.isRead ? -1 : 1));
    }
    return filtered;
  }, [notifications, filter, sortBy]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const stats = useMemo(() => ({
    total: notifications.length,
    unread: unreadCount,
  }), [notifications, unreadCount]);

  const markAsRead = (id: string): void => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = (): void => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string): void => {
    const target = notifications.find(n => n.id === id);
    if (target) {
      setLastDeleted(target);
      setShowUndo(true);
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const undoDelete = (): void => {
    if (lastDeleted) {
      setNotifications(prev => [lastDeleted, ...prev]);
      setShowUndo(false);
      setLastDeleted(null);
    }
  };

  const clearAll = (): void => {
    setNotifications([]);
  };

  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => setShowUndo(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  const getIcon = (type: Notification['type']): React.ReactNode => {
    const props = { size: 20 };
    const iconMap: Record<Notification['type'], React.ReactNode> = {
      job: <Briefcase {...props} className="icon-job" />,
      message: <MessageSquare {...props} className="icon-message" />,
      course: <BookOpen {...props} className="icon-course" />,
      system: <Settings {...props} className="icon-system" />,
    };
    return iconMap[type] || <Bell {...props} />;
  };

  return (
    <div className="notifications-wrapper">
      {/* Decorative Background */}
      <div className="bg-elements">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="notifications-container">
        <VisualHeader
          badge={`Activity Feed • ${stats.unread} New`}
          title="Stay Updated"
          gradient_title="with Alerts"
          subtitle="Manage your notifications, track job updates, and course progress in one place."
        />

        {/* Controls */}
        <div className="notifications-controls">
          <div className="filter-pill-group">
            {(['all', 'unread'] as const).map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`filter-pill ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="badge">
                  {f === 'all' ? stats.total : stats.unread}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="control-actions">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'unread')}
            >
              <option value="recent">Most Recent</option>
              <option value="unread">Unread First</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCircle2 size={16} /> Mark all read
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-danger"
              onClick={clearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 size={16} /> Clear all
            </motion.button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <EmptyState
              title="No notifications yet"
              description={filter === 'unread' ? "You've read everything! Check 'All' for history." : "We'll notify you here when there's activity."}
            />
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  n={n}
                  getIcon={getIcon}
                  onDelete={deleteNotification}
                  onRead={markAsRead}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Undo Toast */}
        <AnimatePresence>
          {showUndo && (
            <motion.div
              initial={{ y: 100, x: '-50%', opacity: 0 }}
              animate={{ y: 0, x: '-50%', opacity: 1 }}
              exit={{ y: 100, x: '-50%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="undo-toast"
            >
              <span className="undo-text">Notification removed from your feed</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={undoDelete}
                className="undo-btn"
              >
                <RotateCcw size={14} /> Undo Action
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};



export default Notifications;