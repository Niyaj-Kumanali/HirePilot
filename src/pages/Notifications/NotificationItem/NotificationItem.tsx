import { useMotionValue, useTransform, motion, AnimatePresence } from "framer-motion";
import { Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import type { Notification } from '../../../data/notificationsData';
import './notificationItem.scss';

interface NotificationItemProps {
  n: Notification;
  getIcon: (type: Notification['type']) => React.ReactNode;
  onDelete: (id: string) => void;
  onRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ n, getIcon, onDelete, onRead }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);
  const scale = useTransform(x, [-100, 0], [1.1, 0.9]);

  const handleDragEnd = (_: any, info: any): void => {
    if (info.offset.x < -100) {
      onDelete(n.id);
    }
  };

  const handleNotificationClick = () => {
    if (!n.isRead) {
      onRead(n.id);
    }
    // Logic for redirection could be added here based on notification type
    console.log(`Navigating to details for ${n.type}: ${n.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100, filter: 'blur(10px)' }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        layout: { duration: 0.3 }
      }}
      className="notification-item-outer"
    >
      <div className="swipe-action-bg">
        <motion.div style={{ opacity, scale }}>
          <Trash2 size={24} color="white" />
        </motion.div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -140, right: 0 }}
        dragElastic={0.15}
        style={{ x }}
        onDragEnd={handleDragEnd}
        onClick={handleNotificationClick}
        className={`notification-card ${n.isRead ? 'read' : 'unread'}`}
      >
        <div className="card-icon">
          {getIcon(n.type)}
        </div>

        <div className="card-body">
          <div className="card-header">
            <div className="content">
              <h3 className="title">{n.title}</h3>
              <p className="desc">{n.description}</p>
            </div>
            <div className="meta-info">
              <span className="time">{n.time}</span>
              <ChevronRight size={16} className="chevron-icon" />
            </div>
          </div>
        </div>

        {/* Action Buttons - Desktop */}
        <div className="card-actions-right">
          <AnimatePresence>
            {!n.isRead && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn-mark-read"
                onClick={(e) => {
                  e.stopPropagation();
                  onRead(n.id);
                }}
                title="Mark as read"
              >
                <CheckCircle2 size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn-delete-action"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(n.id);
            }}
            title="Delete notification"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        {!n.isRead && <div className="pulse-dot" />}
      </motion.div>
    </motion.div>
  );
};

export default NotificationItem;
