import { AlertTriangle } from 'lucide-react';

interface ErrorOverlayProps {
    error: { title: string; message: string };
    onRetry: () => void;
    onClose: () => void;
}

const ErrorOverlay = ({ error, onRetry, onClose }: ErrorOverlayProps) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.9)' }}>
            <div className="max-w-[500px] p-4 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-modal">
                <div className="flex flex-col gap-3 items-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(220,38,38,0.1)' }}>
                        <AlertTriangle size={40} color="#dc2626" />
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <h4 className="text-xl font-bold text-[#202124] dark:text-[#e8eaed]">{error.title}</h4>
                        <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] text-center">{error.message}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                        <button
                            onClick={onRetry}
                            className="flex-1 py-2 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-secondary text-white shadow-button transition-all hover:-translate-y-0.5"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 rounded-xl font-bold text-sm border border-white/60 dark:border-white/10 text-[#202124] dark:text-[#e8eaed] bg-white/40 dark:bg-[#1a1d23]/40 backdrop-blur-sm transition-all hover:-translate-y-0.5"
                        >
                            Exit Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorOverlay;
