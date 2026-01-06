import { Star, Users, Clock, ChevronRight } from 'lucide-react'
import React from 'react'

import './coursecard.scss'

interface CourseCardProps {
    image: string;
    title: string;
    instructor: string;
    rating: number;
    reviews: number;
    students: number;
    duration: string;
    level: string;
    icon: any;
    price: number;
}
const CourseCard:React.FC<CourseCardProps> = (course) => {
    const CourseIcon = course.icon;
    return (
        <div className="course-card">
            <div className="course-image" style={{ background: course.image }}>
                <div className="course-badge">
                    <span className="badge-level">{course.level}</span>
                </div>
                <div className="course-icon-wrapper">
                    <CourseIcon size={48} className="course-icon" />
                </div>
            </div>

            <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">by {course.instructor}</p>

                <div className="course-stats">
                    <div className="stat-item">
                        <Star size={16} className="stat-icon" />
                        <span className="stat-text">
                            {course.rating}
                            <span className="stat-light"> ({course.reviews})</span>
                        </span>
                    </div>
                    <div className="stat-item">
                        <Users size={16} className="stat-icon" />
                        <span className="stat-text stat-light">{course.students.toLocaleString()}</span>
                    </div>
                </div>

                <div className="course-meta">
                    <div className="meta-item">
                        <Clock size={14} className="meta-icon" />
                        <span>{course.duration}</span>
                    </div>
                </div>

                <div className="course-footer">
                    <div className="price-container">
                        <span className="price">${course.price}</span>
                    </div>
                    <button className="enroll-btn">
                        Enroll Now
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard