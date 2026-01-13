import { useState, useMemo, useEffect } from 'react';
import './courses.scss';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import CourseCard from './CourseCard/CourseCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { COURSES } from '../../data/courses';
import { ChevronDown, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Pagination from '../../components/Pagination/Pagination';

const CATEGORIES = ['All', 'Web Dev', 'Data Science', 'Design', 'AI/ML'];
const ITEMS_PER_PAGE = 6;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = useMemo(() => {
    let result = COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory.toLowerCase().replace(' ', '-');
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      default: // popular
        result.sort((a, b) => b.students - a.students);
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="courses-page-wrapper">
      {/* Background elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Hero Section */}
      <section className="courses-hero">
        <motion.div
          className="courses-hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VisualHeader
            badge='Industry-Leading Education'
            title='Master New'
            gradient_title='Career Skills'
            subtitle='Expert-led courses designed to help you land your dream job in tech.'
          />

          <motion.div
            className="search-filter-bar glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="search-box">
              <SearchBar placeHolder="What do you want to learn today?" value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="sort-dropdown">
              <Filter size={18} className="filter-icon" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="arrow" size={16} />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="courses-container">
        {/* Category Filters */}
        <motion.div
          className="filters-section glass-panel"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="category-chips">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="results-info">
            <Sparkles size={16} className="sparkle-icon" />
            <span>Showing <b>{paginatedCourses.length}</b> of <b>{filteredCourses.length}</b> courses</span>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.section
          className="courses-grid-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode='popLayout'>
            {paginatedCourses.length > 0 ? (
              <motion.div className="courses-grid" layout>
                {paginatedCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="no-courses"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <EmptyState title="No courses found" description="Try adjusting your search or filters to find what you're looking for." />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Courses;