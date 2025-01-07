import React from 'react';
import '../assets/courseComponent.css'; // Include the CSS for styling the course component

const CourseComponent = () => {
  return (
    <div className="course-container course-slider">
      <div className="course-content">
        <h2>Boost Your Career with Our Online Courses</h2>
        <p>Learn at your own pace with flexible courses designed to help you succeed!</p>
        <div className="cta-buttons">
          <a href="#courses" className="btn-explore">Explore Courses</a>
          <a href="#signup" className="btn-signup">Sign Up Now</a>
        </div>
      </div>
      <div className="course-image">
        <img
          src="https://via.placeholder.com/400x300" // Replace with an actual course image
          alt="Online Course"
          className="course-image-img"
        />
      </div>
    </div>
  );
};

export default CourseComponent;
