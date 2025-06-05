import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import BackgroundVideo from './BackgroundVideo';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/admin/login');
  };

  return (
    <>
      <BackgroundVideo />
<div style={{ position: 'relative', padding: '20px', textAlign: 'center', backgroundColor: 'transparent', minHeight: '100vh', zIndex: 1 }}>
        <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button onClick={() => navigate('/')} className="neon-button">Back to Home</button>
        </header>
<div style={{
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  textAlign: 'left',
  backgroundColor: 'transparent'  // changed from 'rgba(255, 255, 255, 0.8)'
}}>
          <h2>Admin Dashboard</h2>
          <div>
            <button onClick={() => navigate('/admin/add-courses')} style={{ margin: '10px' }} className="neon-button">Add Courses</button>
            <button onClick={() => navigate('/admin/create-exams')} style={{ margin: '10px' }} className="neon-button">Create Exams</button>
            <button onClick={() => navigate('/admin/view-results')} style={{ margin: '10px' }} className="neon-button">User Results</button>
            <button onClick={handleLogout} style={{ margin: '10px' }} className="neon-button">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
