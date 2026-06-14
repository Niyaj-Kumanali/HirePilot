import { Award, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';
import type { PerformanceReportData } from '../../../../types/interview';

interface PerformanceReportProps {
    report: PerformanceReportData;
    position: string;
    onClose: () => void;
}

const PerformanceReport = ({ report, position, onClose }: PerformanceReportProps) => {
    if (!report) return null;

    return (
        <div className="fixed inset-0 z-[9999] p-3 overflow-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.95)' }}>
            <div className="max-w-[700px] w-full bg-white dark:bg-[#1a1d23] rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043] shadow-2xl p-4">
                {/* Header */}
                <div className="flex flex-col gap-2 items-center mb-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(30,126,52,0.1)' }}>
                        <Award size={40} color="#1e7e34" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#202124] dark:text-[#e8eaed]">Interview Complete!</h2>
                    <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] text-center">
                        Great job! Here is your performance analysis for the {position} role.
                    </p>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 mb-4 p-3 rounded-2xl bg-[#fafafa]/50 dark:bg-[#0f172a]/50">
                    <div className="flex items-center justify-center">
                        <div
                            className="w-[150px] h-[150px] rounded-full border-8 border-primary flex flex-col items-center justify-center"
                            style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}
                        >
                            <span className="text-5xl font-extrabold text-primary">{report.overallScore}</span>
                            <span className="text-xs font-semibold text-[#5f6368] dark:text-[#9aa0a6]">Overall Score</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 justify-center">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Communication</span>
                                <span className="text-sm font-bold text-primary">{report.communicationScore}%</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}>
                                <div className="h-full rounded-full bg-primary" style={{ width: `${report.communicationScore}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Technical Knowledge</span>
                                <span className="text-sm font-bold text-primary">{report.technicalScore}%</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}>
                                <div className="h-full rounded-full bg-primary" style={{ width: `${report.technicalScore}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: 'rgba(30,126,52,0.05)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle size={20} color="#1e7e34" />
                        <h4 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed]">Professional Feedback</h4>
                    </div>
                    <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">{report.feedback}</p>
                </div>

                {/* Tips Section */}
                <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: 'rgba(2,136,209,0.05)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp size={20} color="#0288d1" />
                        <h4 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed]">Actionable Tips</h4>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        {report.tips.map((tip: string, i: number) => (
                            <div key={i} className="flex gap-1.5 items-start">
                                <ChevronRight size={16} color="#0288d1" className="mt-0.5" />
                                <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6] flex-1">{tip}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={onClose}
                    className="
                        w-full py-1.5 rounded-xl font-bold text-sm
                        bg-gradient-to-r from-primary to-secondary text-white
                        transition-all
                    "
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PerformanceReport;
