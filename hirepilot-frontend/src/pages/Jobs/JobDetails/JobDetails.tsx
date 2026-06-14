import React, { useEffect } from 'react';
import { X, Briefcase, Building2, Rocket, MapPin, Clock, DollarSign, Users, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type Job from '../../../types/job';

interface JobDetailsProps {
  open: boolean;
  job: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ open, job, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open || !job) return null;

  const handleStartAIInterview = () => {
    onClose();
    navigate('/interview', { state: { job } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#1a1d23] rounded-2xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 hover:bg-white dark:hover:bg-[#1a1d23] transition-all"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div
          className="p-4 border-b border-[#e0e0e0] dark:border-[#3c4043]"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(99,102,241,0.1) 100%)' }}
        >
          <div className="flex gap-2 items-start">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Briefcase size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">{job.title}</h2>
              <div className="flex items-center gap-1">
                <Building2 size={16} className="text-[#5f6368] dark:text-[#9aa0a6]" />
                <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">{job.company}</span>
              </div>
            </div>
            {job.rating && (
              <span className="inline-flex items-center gap-1 text-xs font-bold rounded-full px-2 py-1" style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                <Star size={14} fill="currentColor" />
                {job.rating}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Quick Info Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.location && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e0e0e0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#9aa0a6]">
                <MapPin size={18} /> {job.location}
              </span>
            )}
            {job.salary && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e0e0e0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#9aa0a6]">
                <DollarSign size={18} /> {job.salary}
              </span>
            )}
            {job.type && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e0e0e0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#9aa0a6]">
                <Clock size={18} /> {job.type}
              </span>
            )}
            {job.level && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e0e0e0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#9aa0a6]">
                <Users size={18} /> {job.level}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">About This Role</h4>
            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">{job.description}</p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-lg font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">Required Skills</h4>
            <div className="flex flex-wrap gap-1">
              {job.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 p-3 border-t border-[#e0e0e0] dark:border-[#3c4043] justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded-xl text-sm font-semibold border border-[#e0e0e0] dark:border-[#3c4043] text-[#202124] dark:text-[#e8eaed] transition-all">
            Close
          </button>
          <button
            onClick={handleStartAIInterview}
            className="px-3 py-2 rounded-xl text-sm font-semibold border border-secondary text-secondary hover:bg-secondary/5 transition-all inline-flex items-center gap-1"
          >
            <Sparkles size={18} />
            AI Interview
          </button>
          <button className="px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white inline-flex items-center gap-1 transition-all">
            <Rocket size={18} />
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
