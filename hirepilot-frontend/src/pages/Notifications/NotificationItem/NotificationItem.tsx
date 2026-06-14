import { Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import type { Notification } from '../../../data/notificationsData';

const TYPE_COLORS: Record<Notification['type'], { dot: string; border: string; bg: string }> = {
  job: { dot: 'bg-blue-500', border: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/5' },
  message: { dot: 'bg-emerald-500', border: 'border-l-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/5' },
  system: { dot: 'bg-primary', border: 'border-l-primary', bg: 'bg-primary/5' },
};

interface NotificationItemProps {
  n: Notification;
  getIcon: (type: Notification['type']) => React.ReactNode;
  onDelete: (id: string) => void;
  onRead: (id: string) => void;
}

const relativeTime = (timeStr: string) => {
  const now = new Date();
  const date = new Date(timeStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const NotificationItem: React.FC<NotificationItemProps> = ({ n, getIcon, onDelete, onRead }) => {
  const colors = TYPE_COLORS[n.type];

  return (
    <div className="mb-2 animate-[slideDown_0.3s_ease-out]">
      <div
        onClick={() => { if (!n.isRead) onRead(n.id); }}
        className={`
          p-3 rounded-2xl backdrop-blur-md border cursor-pointer
          transition-all duration-300 ease-out-expo
          flex gap-3 items-start relative overflow-hidden
          ${n.isRead
            ? 'bg-white/40 dark:bg-[#1a1d23]/40 border-white/5 dark:border-white/5'
            : `bg-white/75 dark:bg-[#1a1d23]/75 border-primary/20 ${colors.border} border-l-4 shadow-sm`
          }
          hover:bg-white/90 dark:hover:bg-[#1a1d23]/90
          hover:-translate-y-0.5 hover:shadow-card-hover group
        `}
      >
        {/* Unread gradient overlay */}
        {!n.isRead && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-primary/[0.03]" />
        )}

        {/* Icon */}
        <div
          className={`
            w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
            ${colors.bg}
            border border-black/5 dark:border-white/10
            text-[#5f6368] dark:text-[#9aa0a6]
            transition-transform duration-300
          `}
        >
          {getIcon(n.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {!n.isRead && <span className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0`} />}
                <span className={`text-sm font-extrabold leading-tight ${n.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100'}`}>
                  {n.title}
                </span>
              </div>
              <p className="text-[0.85rem] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                {n.description}
              </p>
            </div>
            <span className="text-[0.65rem] font-semibold text-gray-400 whitespace-nowrap flex-shrink-0 mt-0.5">
              {relativeTime(n.time)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {!n.isRead && (
            <button
              onClick={(e) => { e.stopPropagation(); onRead(n.id); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 bg-black/5 dark:bg-white/5 hover:text-primary hover:bg-primary/10 transition-all"
              title="Mark as read"
            >
              <CheckCircle2 size={16} />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(n.id); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 bg-black/5 dark:bg-white/5 hover:text-red-500 hover:bg-red-500/10 transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 transition-all duration-300 -mr-1" />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
