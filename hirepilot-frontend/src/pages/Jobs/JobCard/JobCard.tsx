import { MapPin, DollarSign, Clock, TrendingUp, Briefcase, Star, ArrowRight } from 'lucide-react';
import type Job from '../../../types/job';
import Card from '../../../components/ui/Card';

interface JobCardProps {
    job: Job;
    onOpen: (job: Job) => void;
}

const getTypeClasses = (type: Job['type']) => {
    const styles: Record<string, string> = {
        'Full-time': 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        'Part-time': 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
        'Contract': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
        'Freelance': 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400',
        'Internship': 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
        'Temporary': 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
        'Remote': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        'Hybrid': 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
        'On-site': 'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400',
        'Volunteer': 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
    };
    return styles[type] || 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400';
};

const JobCard = ({ job, onOpen }: JobCardProps) => {
    const typeClasses = getTypeClasses(job.type);

    return (
        <Card onClick={() => onOpen(job)} className="p-0 flex flex-col group cursor-pointer">
            <div className="p-3 flex flex-col gap-2.5">
                <div className="flex items-start gap-2.5">
                    <div className="flex-1">
                        <h3 className="text-lg font-extrabold mb-1 leading-tight tracking-tight text-[#202124] dark:text-[#e8eaed]">
                            {job.title}
                        </h3>
                        <p className="text-sm font-semibold text-[#5f6368] dark:text-[#9aa0a6]">{job.company}</p>
                    </div>
                </div>

                <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed line-clamp-2 m-0">
                    {job.description}
                </p>

                <div className="flex flex-wrap gap-2 py-2.25 border-t border-b border-white/60 dark:border-white/10">
                    <div className="flex items-center gap-1 text-[0.85rem] font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                        <MapPin size={16} className="text-primary/70" />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[0.85rem] font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                        <DollarSign size={16} className="text-primary/70" />
                        <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[0.85rem] font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                        <Clock size={16} className="text-primary/70" />
                        <span>{job.posted}</span>
                    </div>
                    {job.applicants && (
                        <div className="flex items-center gap-1 text-[0.85rem] font-bold text-[#059669]">
                            <TrendingUp size={16} color="#059669" />
                            <span>{job.applicants} applied</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center gap-2.5 flex-wrap sm:flex-nowrap">
                    <div className="flex gap-1 flex-wrap items-center">
                        <span
                            className={`text-xs font-bold px-1.5 py-0.75 rounded flex items-center gap-0.75 ${typeClasses}`}
                        >
                            <Briefcase size={12} /> {job.type}
                        </span>
                        {job.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="text-xs font-semibold text-[#5f6368] dark:text-[#9aa0a6] px-1.5 py-0.75 rounded bg-primary/5 hover:bg-primary/10 hover:text-primary transition-all"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="flex gap-0.25">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={job.rating >= i + 1 ? "currentColor" : "none"}
                                    className={job.rating >= i + 1 ? "text-primary" : "text-gray-200 dark:text-gray-700"}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-[#202124] dark:text-[#e8eaed]">{job.rating}</span>
                    </div>
                </div>
            </div>

            <div
                className="
                    px-3 py-2
                    bg-secondary/5 dark:bg-secondary/5
                    border-t border-white/60 dark:border-white/10
                    flex items-center justify-between
                    transition-all duration-300 ease-out-expo
                    group-hover:bg-primary/10
                "
            >
                <span className="text-sm font-bold text-[#5f6368] dark:text-[#9aa0a6] transition-colors duration-300 group-hover:text-primary">
                    View position details
                </span>
                <ArrowRight size={20} className="text-primary transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </div>
        </Card>
    );
};

export default JobCard;
