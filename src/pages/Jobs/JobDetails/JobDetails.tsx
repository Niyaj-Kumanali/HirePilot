import React, { useEffect } from 'react';
import { X, Briefcase, Building2, Rocket, MapPin, Clock, DollarSign, Users, Star } from 'lucide-react';
import './jobDetails.scss'
import type Job from '../../../types/job';


interface JobDetailsProps {
  open: boolean;
  job: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ open, job, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  if (!open || !job) return null;

  return (
    <div className="job-detail-overlay" onClick={onClose}>
      <div className="job-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="job-detail-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Header with Background */}
        <div className="job-detail-header">
          <div className="job-detail-header-content">
            <div className="job-detail-icon-box">
              <Briefcase size={28} />
            </div>
            <div className="job-detail-header-text">
              <h2 className="job-detail-title">{job.title}</h2>
              <div className="job-detail-company-info">
                <Building2 size={16} />
                <span>{job.company}</span>
              </div>
            </div>
          </div>

          {job.rating && (
            <div className="job-detail-rating">
              <Star size={16} fill="currentColor" />
              <span>{job.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="job-detail-content">
          {/* Quick Info */}
          <div className="job-detail-quick-info">
            {job.location && (
              <div className="job-detail-info-item">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="job-detail-info-item">
                <DollarSign size={18} />
                <span>{job.salary}</span>
              </div>
            )}
            {job.type && (
              <div className="job-detail-info-item">
                <Clock size={18} />
                <span>{job.type}</span>
              </div>
            )}
            {job.level && (
              <div className="job-detail-info-item">
                <Users size={18} />
                <span>{job.level}</span>
              </div>
            )}
          </div>

          {/* Description Section */}
          <section className="job-detail-section">
            <h3 className="job-detail-section-title">About This Role</h3>
            <p className="job-detail-description">{job.description}</p>
          </section>

          {/* Skills Section */}
          <section className="job-detail-section">
            <h3 className="job-detail-section-title">Required Skills</h3>
            <div className="job-detail-skills">
              {job.tags.map((tag, index) => (
                <span key={tag} className="job-detail-skill-tag" style={{
                  animationDelay: `${index * 0.05}s`
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="job-detail-footer">
          <button className="job-detail-btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="job-detail-btn-primary">
            <Rocket size={18} />
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;