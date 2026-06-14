import { MapPin, DollarSign, Clock, TrendingUp, Briefcase, Star, ArrowRight } from 'lucide-react';
import type Job from '../../../types/job';
import Card from '../../../components/ui/Card';

interface JobCardProps {
    job: Job;
    onOpen: (job: Job) => void;
}

const getTypeStyles = (type: Job['type']) => {
    const styles: Record<string, { bg: string; color: string }> = {
        'Full-time': { bg: '#eef2ff', color: '#6366f1' },
        'Part-time': { bg: '#ecfeff', color: '#0891b2' },
        'Contract': { bg: '#fffbeb', color: '#d97706' },
        'Freelance': { bg: '#f0f9ff', color: '#0284c7' },
        'Internship': { bg: '#fdf2f8', color: '#db2777' },
        'Temporary': { bg: '#fefce8', color: '#ca8a04' },
        'Remote': { bg: '#f0fdfa', color: '#0d9488' },
        'Hybrid': { bg: '#f5f3ff', color: '#7c3aed' },
        'On-site': { bg: '#f1f5f9', color: '#334155' },
        'Volunteer': { bg: '#ecfdf5', color: '#059669' },
    };
    return styles[type] || { bg: '#f8fafc', color: '#64748b' };
};

const JobCard = ({ job, onOpen }: JobCardProps) => {
    const typeStyle = getTypeStyles(job.type);

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

                <div className="flex flex-wrap gap-2 py-2.25 border-t border-b border-black/5 dark:border-white/5">
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
                            className="text-xs font-bold px-1.5 py-0.75 rounded flex items-center gap-0.75"
                            style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
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
                                    fill={job.rating >= i + 1 ? "#6366f1" : "none"}
                                    color={job.rating >= i + 1 ? "#6366f1" : "#e2e8f0"}
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
                    border-t border-black/5 dark:border-white/5
                    flex items-center justify-between
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    group-hover:bg-primary/10
                "
            >
                <span className="text-sm font-bold text-[#5f6368] dark:text-[#9aa0a6] transition-colors duration-300 group-hover:text-primary">
                    View position details
                </span>
                <ArrowRight size={20} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
            </div>
        </Card>
    );
};

export default JobCard;
