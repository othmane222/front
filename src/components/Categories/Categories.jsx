import React, { useState, useEffect } from "react";
import axios from "axios";
import './Categories.css'; // Ensure this path is correct
import LandingNav from "../LandingNav"; // Ensure this path is correct

const Categories = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Number of categories to show initially
  const initialVisibleCount = 12;

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const visibleCategories = showAll ? categories : categories.slice(0, initialVisibleCount);
  const remainingCount = categories.length - initialVisibleCount;

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="categories-wrapper">
      <LandingNav />
      <div className="categories-header">
        <h1 className="primary-heading">Explore Categories</h1>
      </div>
      <div className="categories-container">
        {visibleCategories.map((category, index) => (
          <div key={index} className="category-card">
            <img 
              src={category.image ? category.image : "/path-to-default-image.png"} 
              alt={`${category.name} image`} 
              className="category-image" 
            />
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
      {categories.length > initialVisibleCount && (
        <div className="more-btn-container">
          <button className="secondary-button" onClick={showAll ? handleShowLess : handleShowMore}>
            {showAll ? "Show Less" : `Show More (${remainingCount} more)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
