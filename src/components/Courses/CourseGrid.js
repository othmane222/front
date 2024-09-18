import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseGrid.module.css';

const CourseGrid = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, minPrice, maxPrice]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/courses');
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const handleFilter = () => {
    let results = courses;

    if (searchTerm !== '') {
      const term = searchTerm.toLowerCase();
      results = results.filter(course => 
        course.title.toLowerCase().includes(term) || 
        course.id.toString().includes(term)
      );
    }

    if (minPrice !== '' || maxPrice !== '') {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      results = results.filter(course => 
        (course.price >= min && course.price <= max)
      );
    }

    setFilteredCourses(results);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Filters</h3>
        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <input 
            type="number" 
            name="minPrice" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
          />
          <input 
            type="number" 
            name="maxPrice" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
          />
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses by title or ID..."
          />
        </div>
        <div className={styles.courseGrid}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <Link 
                to={`/course/${course.id}`} 
                key={course.id} 
                className={styles.courseCard}
              >
                <div>
                  <div className={styles.courseTitle}>{course.title}</div>
                  <div className={styles.courseDetails}>
                    <p>Price: ${course.price}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noCourses}>No courses available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
