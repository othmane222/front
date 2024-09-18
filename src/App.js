import React from 'react';
import { Routes, Route, Router, redirect, Navigate } from 'react-router-dom';
import HomePage from './components/Home/Home';
import Login from './pages/Login';
import ResetPassword from './components/Resetpassword/ResetPassword';
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import PrivateRoute from "./router/PrivateRoute";
import AuthProvider from "./hooks/AuthProvider";
import Admin from "./pages/Admin";
import Categories from './components/Categories/Categories';
import Cart from './pages/cart';
import Profile from './components/Profile/Profile';
import ManageStudents from "./components/ManageStudents";
import ManageCategories from "./components/ManageCategories";
import ManageTeachers from "./components/ManageTeachers";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseGrid from './components/Courses/CourseGrid';
import CourseDetails from './components/Courses/CourseDetails';
import VideoDetails from './components/Courses/VideoDetails';
import VideoPlayer from './components/Courses/VideoPlayer';
import AddCourse from './components/AddCourse/AddCourse';
import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';
import RedirectRoute from './router/RedirectRoute'

// Other imports...

const App = () => {
  return (
    <AuthProvider>
      <Routes>

        <Route element={<RedirectRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/courses" element={<Courses />} />
          <Route path={"/courses/:courseName"} element={<CourseDetails />} />

          <Route path='/categories' element={<Categories />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path='/teacher' element={<Teacher/>}/>
          <Route path='/profile' element={<Profile />} />


          <Route path="/course-grid" element={<CourseGrid />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/courses/:courseId/video/:videoId" element={<VideoDetails />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />


          <Route path="admin" element={<Admin />}>
            <Route path="manage-users" element={<ManageStudents />} />
            <Route path="manage-categories" element={<ManageCategories />} />
            <Route path="manage-courses" element={<ManageTeachers />} />

          </Route>

        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
