import { MapPin, DollarSign, Clock, TrendingUp, Briefcase, Star, ArrowRight, Zap } from 'lucide-react';
import type Job from '../../../types/job';
import Card from '../../../components/ui/Card';

interface JobCardProps {
    job: Job;
    onOpen: (job: Job) => void;
}

const COMPANY_COLORS = [
  'from-primary to-secondary',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-sky-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-lime-500 to-green-600',
];

const getCompanyColor = (name: string) => COMPANY_COLORS[name.charCodeAt(0) % COMPANY_COLORS.length];

const getTypeClasses = (type: Job['type']) => {
    const styles: Record<string, string> = {
        'Full-time': 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/30',
        'Part-time': 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/30',
        'Contract': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/30',
        'Freelance': 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800/30',
        'Internship': 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800/30',
        'Temporary': 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/30',
        'Remote': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30',
        'Hybrid': 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/30',
        'On-site': 'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/30',
        'Volunteer': 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30',
    };
    return styles[type] || 'bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800/30';
};

const JobCard = ({ job, onOpen }: JobCardProps) => {
    const typeClasses = getTypeClasses(job.type);

    return (
        <Card onClick={() => onOpen(job)} className="p-0 flex flex-col group cursor-pointer overflow-hidden">
            {/* Top Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-primary to-secondary" />

            <div className="p-3.5 flex flex-col gap-3">
                {/* Header: Logo + Title */}
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getCompanyColor(job.company)} flex items-center justify-center font-bold text-white text-sm shadow-sm flex-shrink-0`}>
                        {job.company.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-extrabold leading-tight text-[#202124] dark:text-[#e8eaed] line-clamp-1">
                            {job.title}
                        </h3>
                        <p className="text-sm font-semibold text-[#5f6368] dark:text-[#9aa0a6]">{job.company}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0 ${typeClasses}`}>
                        <Briefcase size={11} />
                        {job.type}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed line-clamp-2">
                    {job.description}
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[0.8rem] font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                    <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-primary/60" />
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <DollarSign size={14} className="text-primary/60" />
                        {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={14} className="text-primary/60" />
                        {job.posted}
                    </span>
                    {job.applicants && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <TrendingUp size={14} />
                            {job.applicants} applied
                        </span>
                    )}
                </div>

                {/* Tags + Rating */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                        {job.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[0.7rem] font-semibold text-[#5f6368] dark:text-[#9aa0a6] px-2 py-0.5 rounded-md bg-primary/5 hover:bg-primary/10 hover:text-primary transition-all">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={job.rating >= i + 1 ? "currentColor" : "none"}
                                    className={job.rating >= i + 1 ? "text-primary" : "text-gray-200 dark:text-gray-700"}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-[#202124] dark:text-[#e8eaed]">{job.rating}</span>
                    </div>
                </div>
            </div>

            {/* Hover Action Bar */}
            <div className="px-3.5 py-2.5 border-t border-white/60 dark:border-white/10 bg-white/40 dark:bg-[#1a1d23]/40 flex items-center justify-between transition-all duration-300 group-hover:bg-primary/[0.04]">
                <span className="text-sm font-semibold text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-primary transition-colors">
                    View position details
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onOpen(job); }}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-button hover:shadow-card-hover transition-all"
                    >
                        <Zap size={14} />
                        Quick Apply
                    </button>
                    <ArrowRight size={16} className="text-primary" />
                </div>
            </div>
        </Card>
    );
};

export default JobCard;
