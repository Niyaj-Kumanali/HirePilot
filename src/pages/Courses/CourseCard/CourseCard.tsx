import React, { useState, useCallback } from 'react';
import { Star, Users, Clock, ChevronRight, Bookmark, PlayCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../../../types/course';
import './coursecard.scss';
import { motion } from 'framer-motion';

interface CourseCardProps {
    course: Course;
    onEnroll?: (courseId: string) => void;
    onWishlist?: (courseId: string, isWishlisted: boolean) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, onWishlist }) => {
    const {
        id,
        title,
        instructor,
        rating,
        reviews,
        students,
        duration,
        price,
        image,
        level,
        category,
        bestseller
    } = course;

    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);

    const handleNavigate = () => {
        navigate(`/courses/${id}`);
    };

    const handleWishlist = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsWishlisted(prev => !prev);
        onWishlist?.(id, !isWishlisted);
    }, [id, isWishlisted, onWishlist]);

    const handleEnroll = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEnrolling(true);
        setTimeout(() => {
            onEnroll?.(id);
            setIsEnrolling(false);
        }, 1000);
    }, [id, onEnroll]);

    const isPopular = students > 50000;

    return (
        <motion.article
            className="course-card glass-panel"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onClick={handleNavigate}
        >
            {/* Image Container */}
            <div className="course-image-container">
                <img
                    src={image}
                    alt={title}
                    className="course-image"
                    loading="lazy"
                />

                <div className="image-gradient-overlay"></div>

                <div className="preview-overlay">
                    <PlayCircle size={48} className="preview-icon" />
                    <span>Preview Course</span>
                </div>

                {/* Top Badges */}
                <div className="top-badges">
                    {bestseller && (
                        <div className="badge bestseller">
                            <Award size={12} />
                            <span>Bestseller</span>
                        </div>
                    )}
                    <div className="badge level">{level}</div>
                </div>

                {/* Wishlist Button */}
                <button
                    className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={handleWishlist}
                    type="button"
                >
                    <Bookmark size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Content */}
            <div className="course-card-body">
                <div className="header-meta">
                    <span className="course-category">{category}</span>
                    {isPopular && <span className="popular-tag">Popular</span>}
                </div>

                <h3 className="course-title">{title}</h3>
                <p className="course-instructor">By {instructor}</p>

                <div className="course-stats-row">
                    <div className="stat-pill rating">
                        <Star size={14} fill="#fbaf24" color="#fbaf24" />
                        <span className="rating-val">{rating.toFixed(1)}</span>
                        <span className="review-count">({reviews.toLocaleString()})</span>
                    </div>
                    <div className="stat-pill students">
                        <Users size={14} />
                        <span>{students > 1000 ? `${(students / 1000).toFixed(1)}k` : students} students</span>
                    </div>
                </div>

                <div className="course-footer-row">
                    <div className="duration">
                        <Clock size={14} />
                        <span>{duration}</span>
                    </div>
                    <div className="price-tag">
                        <span className="currency">$</span>
                        <span className="amount">{price}</span>
                    </div>
                </div>

                <button
                    className={`enroll-action-btn ${isEnrolling ? 'loading' : ''}`}
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                >
                    <span>{isEnrolling ? 'Enrolling...' : 'Enroll Now'}</span>
                    <ChevronRight size={18} />
                </button>
            </div>
        </motion.article>
    );
};

export default CourseCard;
