import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import BackgroundVideo from './BackgroundVideo';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <>
      <BackgroundVideo />
      <div style={{ position: 'relative', padding: '20px', textAlign: 'center', backgroundColor: 'transparent', minHeight: '100vh', zIndex: 1 }}>
        <div style={{
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  textAlign: 'left',
  backgroundColor: 'rgba(255, 255, 255, 0.8)'  // 👈 changed from '#fff'
}}>
          <h2>User Dashboard</h2>
          <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </header>
          <div>
            <button onClick={() => navigate('/user/available-courses')} style={{ margin: '10px' }}>
              Available Courses
            </button>
            <button onClick={() => navigate('/practice')} style={{ margin: '10px' }}>
              Practice
            </button>
            <button onClick={() => navigate('/user/profile')} style={{ margin: '10px' }}>
              Profile
            </button>
            <button onClick={handleLogout} style={{ margin: '10px' }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
