import { useState } from 'react';
import { Filter, Zap, BookOpen, TrendingUp, Award } from 'lucide-react';
import './courses.scss';
import Training from '../Training/Traning';
import AuthService from '../../api/auth';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import CourseCard from './CourseCard/CourseCard';
import EmptyState from '../../components/EmptyState/EmptyState';


const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const isAuthenticated = AuthService.getAuthenticationState();

  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      category: 'web-dev',
      instructor: 'Sarah Chen',
      students: 2430,
      rating: 4.8,
      reviews: 340,
      duration: '12 weeks',
      level: 'Advanced',
      price: 99,
      image: 'linear-gradient(135deg, var(--theme-color-primary), #6366f1)',
      icon: Zap,
    },
    {
      id: 2,
      title: 'Full Stack JavaScript',
      category: 'web-dev',
      instructor: 'Mike Johnson',
      students: 5620,
      rating: 4.7,
      reviews: 820,
      duration: '16 weeks',
      level: 'Intermediate',
      price: 79,
      image: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      icon: BookOpen,
    },
    {
      id: 3,
      title: 'Python for Data Science',
      category: 'data-science',
      instructor: 'Dr. Emma Smith',
      students: 8940,
      rating: 4.9,
      reviews: 1240,
      duration: '14 weeks',
      level: 'Beginner',
      price: 69,
      image: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      icon: TrendingUp,
    },
    {
      id: 4,
      title: 'UI/UX Design Masterclass',
      category: 'design',
      instructor: 'Alex Rivera',
      students: 3450,
      rating: 4.8,
      reviews: 510,
      duration: '10 weeks',
      level: 'Intermediate',
      price: 89,
      image: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: Award,
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      category: 'data-science',
      instructor: 'Dr. James Wilson',
      students: 4210,
      rating: 4.7,
      reviews: 620,
      duration: '15 weeks',
      level: 'Intermediate',
      price: 109,
      image: 'linear-gradient(135deg, #10b981, #059669)',
      icon: Zap,
    },
    {
      id: 6,
      title: 'Mobile App Development',
      category: 'web-dev',
      instructor: 'Lisa Park',
      students: 3890,
      rating: 4.8,
      reviews: 580,
      duration: '13 weeks',
      level: 'Advanced',
      price: 99,
      image: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      icon: Zap,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'design', label: 'Design' },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === 'all' || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses-wrapper">
      {/* Tabs Section */}
      {isAuthenticated &&
        <section className="courses-tabs">
          <div className="tabs-container">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Explore Courses
            </button>
            <button
              className={`tab-btn ${activeTab === 'my-courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-courses')}
            >
              My Courses
            </button>
          </div>
        </section>
      }

      {/* EXPLORE COURSES TAB */}
      {activeTab === 'all' && (
        <>
          {/* Hero Section */}
          <section className="courses-hero">
            <div className="courses-hero-content">
              <VisualHeader badge='Grow Your Skills' title='Unlock Your' gradient_title='Potential' subtitle='Learn from industry experts and advance your career with our comprehensive courses' />
              <SearchBar placeHolder="Search courses..." value={searchQuery} onChange={setSearchQuery} />
            </div>
          </section>

          {/* Filters Section */}
          <section className="courses-filters">
            <div className="filters-container">
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`tab-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="sort-container">
                <Filter size={18} className="filter-icon" />
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
              </div>
            </div>
          </section>

          {/* Courses Grid */}
          <section className="courses-grid-section">
            <div className="courses-grid">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  return (
                    <CourseCard key={course.id} {...course} />
                  );
                })
              ) : (
                <div className="no-courses">
                  {/* <p>No courses found. Try adjusting your filters.</p> */}
                  <EmptyState />
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* MY COURSES TAB */}
      {activeTab === 'my-courses' && (
        <section className="my-courses-section">
          <Training />
        </section>
      )}
    </div>
  );
};

export default Courses;