import React from 'react'
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  Clock,
  Target,
  MoreVertical,
  ArrowRight,
  Zap
} from 'lucide-react'
import './dashboard.scss'
import { Link } from 'react-router-dom'
import {USER_COURSES} from '../../data/courses'
import UserCourseCard from '../../components/UserCourseCard/UserCourseCard'

const Dashboard: React.FC = () => {
  const statCards = [
    { id: 1, title: 'Learning Hours', value: '24h 30m', change: 12, type: 'up', icon: <Clock size={22} />, color: '#3b82f6' },
    { id: 2, title: 'Courses Completed', value: '8', change: 25, type: 'up', icon: <BookOpen size={22} />, color: 'var(--theme-color-primary)' },
    { id: 3, title: 'Points Earned', value: '2,450', change: 8, type: 'up', icon: <Award size={22} />, color: '#f59e0b' },
    { id: 4, title: 'Streak Days', value: '12', change: 5, type: 'up', icon: <Zap size={22} />, color: '#10b981' },
  ]


  return (
    <main className="dashboard-container">
      <div className="content-wrapper">

        {/* TOP HEADER */}
        <header className="hero-header">
          <div className="welcome-text">
            <h1>Welcome back, <span className="gradient-span">Nawaz!</span></h1>
            <p>You've completed 75% of your weekly goal. Keep it up!</p>
          </div>
          <Link to={"/training"} >
            <button className="primary-cta">
              Continue Learning <ArrowRight size={18} />
            </button>
          </Link>
        </header>

        {/* STATS SECTION */}
        <section className="stats-grid">
          {statCards.map(card => (
            <div key={card.id} className="glass-card stat-item">
              <div className="stat-top">
                <div className="icon-wrapper" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                  {card.icon}
                </div>
                <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
              </div>
              <div className="stat-body">
                <span className="label-text">{card.title}</span>
                <h2 className="value-text">{card.value}</h2>
              </div>
              <div className="stat-footer">
                <span className="trend-text" style={{ color: card.type === 'up' ? '#10b981' : '#ef4444' }}>
                  {card.type === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {card.change}% vs last week
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* MAIN BODY GRID */}
        <div className="main-layout-grid">

          {/* LEFT: Goals Progress */}
          <section className="glass-card section-container">
            <div className="section-header">
              <h3>Learning Goals Progress</h3>
            </div>
            <div className="goals-list">
              {USER_COURSES.map(item => (
                <div key={item.id} className="goal-row">
                  <div className="goal-info">
                    <span>{item.title}</span>
                    <span className="goal-percent">{item.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${item.progress}%`,
                        backgroundColor: item.progress < 40 ? '#ef4444' : item.progress < 70 ? '#f59e0b' : 'var(--theme-color-primary)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: Recent Activity Snippet */}
          <section className="glass-card section-container">
            <div className="section-header">
              <h3>Next Milestone</h3>
            </div>
            <div className="milestone-box">
              <div className="milestone-content">
                <Target color="var(--theme-color-primary)" size={32} />
                <div>
                  <h4>100 Days Streak</h4>
                  <p>88 days completed. 12 days to go!</p>
                </div>
              </div>
              <div className="milestone-track">
                <div className="milestone-fill" style={{ width: '88%' }}></div>
              </div>
            </div>
          </section>

        </div>

        {/* COURSES SECTION */}
        <section className="courses-section">
          <div className="section-title-row">
            <h3>In-Progress Courses</h3>
            <Link to={'/courses'} >
              <button className="text-link">Browse all <ArrowRight size={14} /></button>
            </Link>
          </div>
          <div className="courses-grid">
            {USER_COURSES.map(course => (
              <UserCourseCard {...course} key={course.id} />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

export default Dashboard