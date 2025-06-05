import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';
import './App.css';

// Import pages (to be created)
import Home from './Home';
import AdminSignup from './AdminSignup';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AddCourses from './AddCourses';
import CreateExams from './CreateExams';
import ViewResults from './ViewResults';
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';
import UserDashboard from './UserDashboard';
import AvailableCourses from './AvailableCourses';
import TakeTest from './TakeTest';
import Profile from './Profile';
import PracticePage from './PracticePage';

function App() {
  return (
    <Router>
      <div className="background-video-container">
        <BackgroundVideo />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-courses" element={<AddCourses />} />
        <Route path="/admin/create-exams" element={<CreateExams />} />
        <Route path="/admin/view-results" element={<ViewResults />} />

        {/* User Routes */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/available-courses" element={<AvailableCourses />} />
        <Route path="/user/take-test/:courseId" element={<TakeTest />} />
        <Route path="/user/profile" element={<Profile />} />

        {/* Practice Route */}
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
