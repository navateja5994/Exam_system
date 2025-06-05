import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesList);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load courses:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <>
      <BackgroundVideo />
      <div style={{ position: 'relative', padding: '20px', textAlign: 'center', backgroundColor: 'transparent', minHeight: '100vh' }}>
        <div style={{
          maxWidth: '700px',
          margin: '20px auto',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          textAlign: 'left'
        }}>
          <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => navigate('/user/dashboard')}>Back to Dashboard</button>
          </header>
          <h2>Available Courses</h2>
          {courses.length === 0 ? (
            <p>No courses available.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {courses.map(course => (
                <li key={course.id} style={{ marginBottom: '10px' }}>
                  <strong>{course.title}</strong> - {course.description} (Duration: {course.duration})
                  <br />
                  <button onClick={() => navigate(`/user/take-test/${course.id}`)} style={{ marginTop: '5px' }}>
                    Take Test
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableCourses;
