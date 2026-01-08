import { useState } from 'react';
import './courses.scss';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import CourseCard from './CourseCard/CourseCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { COURSES } from '../../data/courses';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');




  const filteredCourses = COURSES.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses-wrapper">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="courses-hero-content">
          <VisualHeader badge='Grow Your Skills' title='Unlock Your' gradient_title='Potential' subtitle='Learn from industry experts and advance your career with our comprehensive courses' />
          <SearchBar placeHolder="Search courses..." value={searchQuery} onChange={setSearchQuery} />
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
    </div>
  );
};

export default Courses;