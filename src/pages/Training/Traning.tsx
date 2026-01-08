import { useState } from 'react';
import {
  BookOpen,
  Trophy,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Target,
  X,
  Flame,
  TrendingUp,
  Sparkles
} from 'lucide-react';

import './training.scss'
import type { UserCourse } from '../../types/course';
import { USER_COURSES } from '../../data/courses';
import CourseCard from '../../components/UserCourseCard/UserCourseCard';

type StatCardProps = {
  Icon: any,
  value: string,
  label: string,
  color: string
}

const Training = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<UserCourse | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);


  const StatCard = ({ Icon, value, label, color }: StatCardProps) => (
    <div className="stat-card" style={{ borderColor: `${color}20`, backgroundColor: `${color}08` }}>
      <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15` }}>
        <Icon size={24} color={color} strokeWidth={2.5} />
      </div>
      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );

  return (
    <main className="training-container">
      <div className="background-animation"></div>

      <header className="training-header">
        <div className="header-text">
          <div className="greeting-badge">
            <Sparkles size={16} /> Good to see you again
          </div>
          <h1 className="welcome-title">
            Welcome back, <span className="gradient-text">Nawaz!</span>
          </h1>
          <p className="welcome-subtitle">
            You're on a 🔥 roll! 4 modules completed this week. Let's keep the momentum going!
          </p>
        </div>

        <aside className="stats-bar">
          <StatCard Icon={Trophy} value="1,240" label="Points" color="#f59e0b" />
          <StatCard Icon={Flame} value="8" label="Streak" color="#ef4444" />
          <StatCard Icon={Clock} value="24h" label="This Week" color="#3b82f6" />
          <StatCard Icon={TrendingUp} value="+12%" label="Growth" color="#10b981" />
        </aside>
      </header>

      <section className="train-hero-recommendation">
        <div className="train-hero-content">
          <div className="rec-badge-container">
            <div className="rec-badge">
              <Zap size={14} className="rec-icon" />
              <span>Recommended for you</span>
            </div>
          </div>
          <h2 className="train-hero-title">Prepare for Backend Interviews</h2>
          <p className="train-hero-description">
            Master the skills top tech companies look for. A curated path covering advanced database optimization, microservices architecture, and system design patterns.
          </p>
          <ul className="benefit-list">
            <li><CheckCircle size={20} className="check-icon" /> Advanced SQL Performance & Indexing Strategies</li>
            <li><CheckCircle size={20} className="check-icon" /> Microservices with NestJS & Docker</li>
            <li><CheckCircle size={20} className="check-icon" /> Real-world interview questions from FAANG</li>
          </ul>
          <button className="primary-button train-hero-button">
            <Target size={20} />
            <span>Start Learning Track</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="train-hero-visual-card">
          <div className="visual-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <BookOpen size={120} className="train-hero-icon" />
        </div>
      </section>

      <section className="section-container">
        <div className="section-title-row">
          <div>
            <h2 className="section-heading">Continue Learning</h2>
            <p className="section-subtext">Pick up where you left off</p>
          </div>
          <button className="text-link">
            Browse All Courses <ArrowRight size={16} />
          </button>
        </div>

        <div className="course-grid">
          {USER_COURSES.map((course: UserCourse) => (
            <article
              key={course.id}
              className={`${hoveredCard === course.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                setSelectedCourse(course);
                setIsDialogOpen(true);
              }}
            >
              <CourseCard {...course} />

            </article>
          ))}
        </div>
      </section>

      {isDialogOpen && selectedCourse && (
        <div className="course-detail-modal-overlay" onClick={() => setIsDialogOpen(false)}>
          <div className="course-detail-modal-content" onClick={e => e.stopPropagation()}>
            <button className="course-detail-modal-close-icon" onClick={() => setIsDialogOpen(false)}>
              <X size={24} />
            </button>
            <div className="course-detail-modal-inner">
              <div className="course-detail-modal-hero">
                <img src={selectedCourse.image} alt="" className="course-detail-modal-hero-img" />
                <div className="course-detail-modal-hero-overlay"></div>
                <div className="course-detail-modal-hero-badge">{selectedCourse.category}</div>
              </div>
              <div className="course-detail-modal-details">
                <h3 className="course-detail-modal-title">{selectedCourse.title}</h3>

                <div className="course-detail-modal-instructor">
                  <div className="instructor-avatar" style={{
                    background: 'linear-gradient(135deg, var(--theme-color-primary), #6366f1)'
                  }}></div>
                  <div>
                    <span className="instructor-label">Instructor</span>
                    <p className="instructor-detail">{selectedCourse.instructor}</p>
                  </div>
                </div>

                <div className="course-detail-modal-stats-grid">
                  <div className="course-detail-modal-stat">
                    <Clock size={18} />
                    <div>
                      <span className="stat-label-small">Duration</span>
                      <p>{selectedCourse.duration}</p>
                    </div>
                  </div>
                  <div className="course-detail-modal-stat">
                    <BookOpen size={18} />
                    <div>
                      <span className="stat-label-small">Lessons</span>
                      <p>{selectedCourse.lessons}</p>
                    </div>
                  </div>
                  <div className="course-detail-modal-stat">
                    <Star size={18} />
                    <div>
                      <span className="stat-label-small">Rating</span>
                      <p>{selectedCourse.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="course-detail-modal-progress">
                  <div className="progress-header">
                    <span>Your Progress</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${selectedCourse.progress}%` }}></div>
                  </div>
                </div>

                <p className="course-detail-modal-desc">
                  Continue your learning journey! You're currently at lesson {Math.floor((selectedCourse.lessons * selectedCourse.progress) / 100)} of {selectedCourse.lessons}. Great progress so far!
                </p>

                <div className="course-detail-modal-actions">
                  <button className="secondary-button" onClick={() => setIsDialogOpen(false)}>Close</button>
                  <button className="primary-button course-detail-modal-button">
                    Resume Lesson
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Training;