import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Send, Loader } from 'lucide-react';

interface ControlBarProps {
    isMuted: boolean;
    isVideoOff: boolean;
    isAudioEnabled: boolean;
    onToggleMute: () => void;
    onToggleVideo: () => void;
    onToggleAudio: () => void;
    isListening: boolean;
    onToggleListening: () => void;
    userInput: string;
    setUserInput: (val: string) => void;
    onSendMessage: () => void;
    isLoading: boolean;
}

const ControlBar = ({
    isMuted,
    isVideoOff,
    isAudioEnabled,
    onToggleMute,
    onToggleVideo,
    onToggleAudio,
    isListening,
    onToggleListening,
    userInput,
    setUserInput,
    onSendMessage,
    isLoading
}: ControlBarProps) => {
    const btnBase = "w-10 h-10 flex items-center justify-center rounded-lg transition-all";
    const btnActive = "bg-black/5 dark:bg-white/10 text-[#202124] dark:text-[#e8eaed] hover:bg-black/10 dark:hover:bg-white/20";
    const btnError = "bg-[#dc2626] text-white hover:bg-[#b91c1c]";

    return (
        <footer
            className="
                flex justify-between items-center p-3 gap-3
                bg-white/80 dark:bg-[#1a1d23]/80
                backdrop-blur-[12px]
                border-t border-white/60 dark:border-white/10
            "
        >
            <div className="flex gap-2">
                <button
                    onClick={onToggleMute}
                    className={`${btnBase} ${isMuted ? btnError : btnActive}`}
                >
                    {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                    onClick={onToggleVideo}
                    className={`${btnBase} ${isVideoOff ? btnError : btnActive}`}
                >
                    {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                </button>
                <button
                    onClick={onToggleAudio}
                    className={`${btnBase} ${!isAudioEnabled ? btnError : btnActive}`}
                >
                    {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
            </div>

            <div className="flex gap-2 flex-1 max-w-[600px]">
                <div className="relative flex-1">
                    <input
                        placeholder="Type your response..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                        disabled={isLoading}
                        className="
                            w-full pl-3 pr-10 py-2 rounded-xl text-sm
                            bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm
                            border border-white/60 dark:border-white/10
                            text-[#202124] dark:text-[#e8eaed]
                            placeholder:text-[#5f6368] dark:placeholder:text-[#9aa0a6]
                            outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                            transition-all
                        "
                    />
                    <button
                        onClick={onToggleListening}
                        disabled={isLoading}
                        className={`
                            absolute right-2 top-1/2 -translate-y-1/2
                            w-8 h-8 flex items-center justify-center rounded-lg transition-all
                            ${isListening
                                ? 'bg-[#dc2626] text-white'
                                : 'bg-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:bg-primary/10'
                            }
                        `}
                        style={isListening ? { animation: 'pulse-glow 1.5s ease-in-out infinite' } : {}}
                    >
                        <Mic size={20} />
                    </button>
                </div>

                <button
                    onClick={onSendMessage}
                    disabled={isLoading || (!userInput.trim() && !isListening)}
                    className="
                        min-w-[100px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-sm
                        bg-gradient-to-r from-primary to-secondary text-white
                        disabled:opacity-60 transition-all
                    "
                >
                    {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </div>
        </footer>
    );
};

export default ControlBar;
