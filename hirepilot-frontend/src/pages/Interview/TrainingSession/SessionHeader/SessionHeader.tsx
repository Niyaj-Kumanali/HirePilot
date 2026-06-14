import { Timer, Loader, X } from 'lucide-react';

interface SessionHeaderProps {
    position: string;
    company: string;
    timeLeft: number;
    formatTime: (seconds: number) => string;
    onFinish: () => void;
    onClose: () => void;
    isFinishing: boolean;
    canFinish: boolean;
}

const SessionHeader = ({
    position,
    company,
    timeLeft,
    formatTime,
    onFinish,
    onClose,
    isFinishing,
    canFinish
}: SessionHeaderProps) => {
    const isWarning = timeLeft < 60;

    return (
        <header
            className="
                flex justify-between items-center p-3
                bg-white/80 dark:bg-[#1a1d23]/80
                backdrop-blur-[12px]
                border-b border-[#e0e0e0] dark:border-[#3c4043]
            "
        >
            <div className="flex flex-col gap-1">
                <span
                    className="inline-flex items-center gap-0.5 text-xs font-bold rounded-full px-2 py-0.5 w-fit"
                    style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: '#dc2626' }}
                >
                    <span className="w-2 h-2 rounded-full bg-[#dc2626]" style={{ animation: 'iconPulse 2s ease-in-out infinite' }} />
                    LIVE INTERVIEW
                </span>
                <h3 className="text-xl font-bold text-[#202124] dark:text-[#e8eaed]">{position}</h3>
                <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">{company}</span>
            </div>

            <div
                className="
                    flex items-center gap-2 px-3 py-1.5 rounded-xl
                    bg-white/80 dark:bg-[#1a1d23]/80
                    border border-[#e0e0e0] dark:border-[#3c4043]
                "
            >
                <Timer size={18} color={isWarning ? '#f59e0b' : '#a855f7'} />
                <span
                    className="text-lg font-bold tabular-nums"
                    style={{ color: isWarning ? '#f59e0b' : undefined }}
                >
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div className="flex items-center gap-2">
                {canFinish && (
                    <button
                        onClick={onFinish}
                        disabled={isFinishing}
                        className="
                            flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm
                            bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white
                            disabled:opacity-60 transition-all
                        "
                    >
                        {isFinishing && <Loader size={18} className="animate-spin" />}
                        {isFinishing ? 'Finishing...' : 'Finish Now'}
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="
                        w-10 h-10 flex items-center justify-center rounded-lg
                        bg-[#dc2626]/10 text-[#dc2626]
                        hover:bg-[#dc2626] hover:text-white
                        transition-all
                    "
                >
                    <X size={20} />
                </button>
            </div>
        </header>
    );
};

export default SessionHeader;
