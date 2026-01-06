import { MapPin, DollarSign, Clock, TrendingUp, Briefcase, Star } from 'lucide-react';
import type Job from '../../../types/job';
import './jobCard.scss';

interface JobCardProps {
    job: Job;
    onOpen: (job: Job) => void;
}

const JobCard = ({ job, onOpen }: JobCardProps) => {
    // Helper for Type Badges
    const getTypeStyles = (type: Job['type']) => {
        const styles: Record<Job["type"], { bg: string; color: string }> = {
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

    return (
        <article className="jc-card" onClick={() => onOpen(job)}>
            <div className="jc-body">
                {/* Top Section: Title & Save */}
                <div className="jc-header">
                    <div className="jc-brand">
                        <h3 className="jc-title">{job.title}</h3>
                        <span className="jc-company">{job.company}</span>
                    </div>
                </div>

                <p className="jc-description">{job.description}</p>

                {/* Middle Section: Meta Grid */}
                <div className="jc-meta">
                    <div className="jc-meta-item">
                        <MapPin size={16} /> <span>{job.location}</span>
                    </div>
                    <div className="jc-meta-item">
                        <DollarSign size={16} /> <span>{job.salary}</span>
                    </div>
                    <div className="jc-meta-item">
                        <Clock size={16} /> <span>{job.posted}</span>
                    </div>
                    {job.applicants && (
                        <div className="jc-meta-item jc-applicants">
                            <TrendingUp size={16} /> <span>{job.applicants} applied</span>
                        </div>
                    )}
                </div>

                {/* Bottom Section: Tags & Rating */}
                <div className="jc-footer">
                    <div className="jc-tags">
                        <span
                            className="jc-badge"
                            style={{
                                backgroundColor: getTypeStyles(job.type).bg,
                                color: getTypeStyles(job.type).color
                            }}
                        >
                            <Briefcase size={12} /> {job.type}
                        </span>
                        {job.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="jc-tag">#{tag}</span>
                        ))}
                    </div>

                    <div className="jc-rating">
                        <div className="jc-stars">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={job.rating >= i + 1 ? "#6366f1" : "none"}
                                    color={job.rating >= i + 1 ? "#6366f1" : "#e2e8f0"}
                                />
                            ))}
                        </div>
                        <span className="jc-rating-num">{job.rating}</span>
                    </div>
                </div>
            </div>

            <div className="jc-action-bar">
                <span>View position details</span>
                <div className="jc-arrow">→</div>
            </div>
        </article>
    );
};

export default JobCard;