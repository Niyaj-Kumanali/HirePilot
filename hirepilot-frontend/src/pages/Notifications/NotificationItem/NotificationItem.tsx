import { Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import type { Notification } from '../../../data/notificationsData';

interface NotificationItemProps {
  n: Notification;
  getIcon: (type: Notification['type']) => React.ReactNode;
  onDelete: (id: string) => void;
  onRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ n, getIcon, onDelete, onRead }) => {
  const handleNotificationClick = () => {
    if (!n.isRead) {
      onRead(n.id);
    }
    console.log(`Navigating to details for ${n.type}: ${n.id}`);
  };

  return (
    <div className="mb-2 animate-[slideDown_0.3s_ease-out]">
      <div
        onClick={handleNotificationClick}
        className={`
          p-2.5 rounded-3xl backdrop-blur-[16px] border cursor-pointer
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          flex gap-2.5 items-start relative overflow-hidden
          ${n.isRead
            ? 'bg-white/40 dark:bg-[#1a1d23]/40 border-white/5 dark:border-white/5'
            : 'bg-white/75 dark:bg-[#1a1d23]/75 border-primary/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
          }
          ${!n.isRead && 'border-l-4 border-l-primary'}
          hover:bg-white/90 dark:hover:bg-[#1a1d23]/90
          hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]
          hover:border-primary/30
        `}
      >
        {!n.isRead && (
          <>
            {/* Gradient overlay for unread */}
            <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(168,85,247,0.05), transparent 70%)' }}
            />
            {/* Unread dot */}
            <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(168,85,247,0.1)] hidden sm:block" />
          </>
        )}

        {/* Icon */}
        <div
          className={`
            w-[52px] h-[52px] rounded-[18px] flex items-center justify-center flex-shrink-0
            bg-white/50 dark:bg-[#1a1d23]/50
            border border-black/10 dark:border-white/10
            text-[#5f6368] dark:text-[#9aa0a6]
            transition-all duration-400
            shadow-[0_1px_3px_rgba(0,0,0,0.06)]
            group-hover:rotate-[-5deg] group-hover:scale-105
          `}
          style={{ transition: 'all 0.4s ease' }}
        >
          {getIcon(n.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex justify-between items-start gap-2 mb-0.5">
            <div className="flex-1 min-w-0">
              <div className="text-[1.1rem] font-extrabold leading-tight mb-0.5 text-gray-900 dark:text-gray-100">
                {n.title}
              </div>
              <div className="text-[0.95rem] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                {n.description}
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span className="text-[0.7rem] font-bold text-gray-500 dark:text-gray-400 opacity-70">{n.time}</span>
              <ChevronRight size={16} className="transition-all duration-300 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-primary" style={{ transition: 'all 0.3s ease', opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pt-0.5">
          {!n.isRead && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRead(n.id);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 hover:text-primary hover:bg-primary/10 transition-all"
              title="Mark as read"
            >
              <CheckCircle2 size={18} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(n.id);
            }}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 hover:text-red-500 hover:bg-red-500/10 transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
