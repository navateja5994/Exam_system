import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';

const AddCourses = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title || !description || !duration) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await addDoc(collection(db, 'courses'), {
        title,
        description,
        duration
      });
      setSuccess('Course added successfully!');
      setTitle('');
      setDescription('');
      setDuration('');
    } catch (err) {
      setError('Failed to add course: ' + err.message);
    }
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
          backgroundColor: 'transparent'  // changed from 'rgba(255, 255, 255, 0.8)'
        }}>
          <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => navigate('/admin/dashboard')} className="neon-button">Back to Dashboard</button>
          </header>
          <h2>Add Course</h2>
          <form onSubmit={handleAddCourse}>
            <div>
              <label>Title:</label><br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label><br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Duration:</label><br />
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="submit" style={{ marginTop: '10px' }} className="neon-button">Add Course</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourses;
