import { Sparkles, Lightbulb, User } from 'lucide-react';

interface VideoGridProps {
    isSpeaking: boolean;
    isLoading: boolean;
    isInsightVisible: boolean;
    insight: string | null;
    lastAiMessage: string | undefined;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isVideoOff: boolean;
    isMuted: boolean;
}

const VideoGrid = ({
    isSpeaking,
    isLoading,
    isInsightVisible,
    insight,
    lastAiMessage,
    videoRef,
    isVideoOff,
    isMuted
}: VideoGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 flex-1">
            {/* AI Interviewer View */}
            <div
                className="
                    relative flex items-center justify-center min-h-[400px]
                    bg-[#fafafa]/50 dark:bg-[#0f172a]/50
                    border-2 rounded-2xl overflow-hidden transition-colors duration-300
                "
                style={{ borderColor: isSpeaking ? '#a855f7' : '#e0e0e0' }}
            >
                <div className="flex flex-col items-center gap-2">
                    {isLoading && (
                        <div
                            className="absolute w-[200px] h-[200px] rounded-full"
                            style={{
                                backgroundColor: 'rgba(168,85,247,0.1)',
                                animation: 'pulse-glow 2s ease-in-out infinite',
                            }}
                        />
                    )}
                    <Sparkles
                        size={80}
                        color={isSpeaking ? '#a855f7' : '#5f6368'}
                        className="transition-colors duration-300"
                    />
                    <div className="flex items-end gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 h-5 rounded-sm bg-primary"
                                style={{
                                    animation: isSpeaking ? `wave 1s ease-in-out infinite` : 'none',
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                        AI Interviewer
                    </span>
                </div>

                {/* AI Insight Popup */}
                {isInsightVisible && (
                    <div
                        className="absolute top-4 left-4 right-4 p-2 rounded-xl shadow-md"
                        style={{ backgroundColor: 'rgba(2,136,209,0.95)' }}
                    >
                        <div className="flex gap-1.5 items-start">
                            <Lightbulb size={20} color="#f59e0b" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-bold text-white">AI HINT</span>
                                <span className="text-sm text-white">{insight}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subtitles */}
                {(lastAiMessage || isLoading) && (
                    <div className="absolute bottom-4 left-4 right-4 p-2 rounded-xl bg-white/95 dark:bg-[#1a1d23]/95 text-center">
                        <span
                            className="text-sm font-semibold"
                            style={{ color: isLoading ? '#a855f7' : undefined }}
                        >
                            {isLoading ? "AI is transcribing your response..." : lastAiMessage}
                        </span>
                    </div>
                )}
            </div>

            {/* User Preview View */}
            <div className="relative flex items-center justify-center min-h-[400px] bg-black rounded-2xl overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
                />
                {isVideoOff && (
                    <div className="flex flex-col items-center gap-2">
                        <User size={80} color="#5f6368" />
                        <span className="text-[#5f6368]">Camera Signal Lost</span>
                    </div>
                )}
                <div className="absolute bottom-4 left-4 px-2 py-1 rounded-lg bg-white/80 dark:bg-[#1a1d23]/80">
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">You</span>
                        {isMuted && (
                            <span className="text-xs font-semibold text-[#dc2626]">Muted</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGrid;
