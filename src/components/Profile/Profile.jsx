import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService'; // Service for authentication
import axios from 'axios';
import Courses from '../../pages/Courses';
import CourseGrid from '../Courses/CourseGrid';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [courses, setCourses] = useState([]); // State for courses
  const [error, setError] = useState('');

  const fetchTeacherInfo = async () => {
    try {
      const currentUser = AuthService.getCurrentUser(); // Get the current user
      if (!currentUser || !currentUser.id) {
        setError('User not logged in.');
        return;
      }

      // Fetch teacher information
      const userResponse = await axios.get(`http://localhost:8080/api/users/${currentUser.id}`);
      setTeacherInfo(userResponse.data);

      // Fetch courses if the user is a teacher
      if (userResponse.data.role === 'TEACHER') {
        const coursesResponse = await axios.get(`http://localhost:8080/api/courses/teacher/${currentUser.id}`);
        console.log("Courses response:", coursesResponse.data); // Log the response
        setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
        console.log('')
      }
    } catch (err) {
      setError('Error fetching teacher information or courses.');
    }
  };


  useEffect(() => {

    fetchTeacherInfo();
  }, []);


  if (!teacherInfo) {
    return <div className="text-center text-gray-500 mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profile Information</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">{teacherInfo.username}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{teacherInfo.email}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">Role:</span>
            <span className="text-gray-800 capitalize">{teacherInfo.role}</span>
          </div>
          {/* Display courses if the user is a teacher */}
          {teacherInfo.role === 'TEACHER' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Courses Created</h2>
              {courses.length > 0 ? (
                
                
                <ul className="list-disc list-inside space-y-2">
                  {courses.map((course) => (
                    <li key={course.id} className="text-gray-800">
                    
                      <Link 

                to={`/course/${course.id}`} 
                key={course.id} 
                
              >
                <div>
                  <div >{course.title}</div>
                  <div>
                    <p>Price: ${course.price}</p>
                    <p>course id : {course.id}</p>
                  </div>
                </div>
              </Link> {/* Assuming course has a title property */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No courses created yet.</p>
              )}
            </div>
          )}
        </div>
        
      </div>
      
      
    </div>
  );
};

export default ProfilePage;
