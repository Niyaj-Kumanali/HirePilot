const Scanner = () => {
    return (
        <div className="relative h-[400px] w-[400px] flex justify-center items-center">
            <div className="w-full h-full rounded-3xl border border-[#e0e0e0] dark:border-[#3c4043] relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                {/* Scanning Line Effect */}
                <div
                    className="absolute w-full h-20 z-5"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.05), rgba(168,85,247,0.2), transparent)',
                        animation: 'scan-line 4s ease-in-out infinite',
                    }}
                />

                {/* AI Analysis Card */}
                <div
                    className="
                        absolute w-[200px] top-10 left-[30px] z-10
                        bg-white dark:bg-[#1a1d23]
                        border border-[#e0e0e0] dark:border-[#3c4043]
                        rounded-2xl p-2
                        shadow-md
                        animate-[float_6s_ease-in-out_infinite]
                    "
                >
                    <div className="flex items-center gap-1 mb-1.5">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: '#1e7e34',
                                boxShadow: '0 0 8px rgba(30,126,52,0.5)',
                            }}
                        />
                        <span className="text-[0.75rem] font-bold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wide">
                            AI Analysis
                        </span>
                    </div>
                    <div className="h-2 bg-black/10 dark:bg-white/10 rounded mb-1 w-full" />
                    <div className="h-2 bg-black/10 dark:bg-white/10 rounded w-[70%]" />
                </div>

                {/* Score Card */}
                <div
                    className="
                        absolute w-[120px] bottom-10 right-[30px] z-10
                        bg-white dark:bg-[#1a1d23]
                        border border-[#e0e0e0] dark:border-[#3c4043]
                        rounded-2xl p-2
                        shadow-md
                        flex flex-col items-center
                        animate-[float_6s_ease-in-out_infinite]
                    "
                    style={{ animationDelay: '-2s' }}
                >
                    <div className="w-[60px] h-[60px] relative mb-1">
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e0e0e0"
                                strokeWidth="3.8"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="3.8"
                                strokeLinecap="round"
                                strokeDasharray="85, 100"
                                style={{ animation: 'scan-progress 2s ease-out forwards' }}
                            />
                        </svg>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-primary text-[0.85rem]">
                            85%
                        </span>
                    </div>
                    <span className="text-[0.75rem] font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                        Readiness
                    </span>
                </div>

                {/* Insight Bar */}
                <div
                    className="
                        absolute w-[160px] top-40 right-5 z-10
                        bg-white dark:bg-[#1a1d23]
                        border border-[#e0e0e0] dark:border-[#3c4043]
                        rounded-2xl p-1.5
                        shadow-md
                        flex items-center gap-1.5
                        animate-[float_6s_ease-in-out_infinite]
                    "
                    style={{ animationDelay: '-4s' }}
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" style={{ animation: 'iconPulse 2s infinite' }} />
                    <div className="h-2 bg-black/10 dark:bg-white/10 rounded flex-1" />
                </div>
            </div>
        </div>
    );
};

export default Scanner;
