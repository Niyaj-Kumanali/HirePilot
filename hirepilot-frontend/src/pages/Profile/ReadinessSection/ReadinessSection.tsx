import React from 'react';
import { Rocket, Activity, Zap, Shield, Target, type LucideIcon } from 'lucide-react';
import type { ReadinessMetric } from '../../../store/CurrentUser/currentuser.types';
import Card from '../../../components/ui/Card';

interface ReadinessSectionProps {
    readiness: ReadinessMetric[];
}

const iconMap: Record<string, LucideIcon> = {
    Zap, Activity, Shield, Target
};

const ReadinessSection: React.FC<ReadinessSectionProps> = ({ readiness }) => {
    return (
        <Card className="p-4 rounded-2xl border border-black/10 dark:border-white/10">
            <div className="space-y-1 mb-4">
                <div className="flex items-center gap-1.5">
                    <Rocket size={22} className="text-primary" />
                    <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">Interview Readiness</h5>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Real-time analytics based on your AI interview performance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {readiness.map((m, i) => {
                    const Icon = iconMap[m.icon] || Activity;
                    return (
                        <div
                            key={i}
                            className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-[#0f172a]/30"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${m.color}1A`, color: m.color }}
                                >
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{m.label}</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{m.score}%</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default ReadinessSection;
