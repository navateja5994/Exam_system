import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SVGBackground from './SVGBackground';

const Profile = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setName(userDocSnap.data().name || '');
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    const fetchResults = async () => {
      try {
        const q = query(collection(db, 'results'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const resultsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(resultsList);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load results:', err);
        setLoading(false);
      }
    };

    fetchUserData();
    fetchResults();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <SVGBackground />
      <div style={{ position: 'relative', padding: '20px', textAlign: 'center', backgroundColor: 'transparent', minHeight: '100vh' }}>
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
            <button onClick={() => navigate('/user/dashboard')}>Back to Dashboard</button>
          </header>
          <h2>Profile</h2>
          <p><strong>Name:</strong> {name || auth.currentUser.email}</p>
          <p><strong>Email:</strong> {auth.currentUser.email}</p>
          <h3>Attempted Tests</h3>
          {results.length === 0 ? (
            <p>No tests attempted yet.</p>
          ) : (
            <ul>
              {results.map(result => (
                <li key={result.id}>
                  Course ID: {result.courseId} - Score: {result.score} / {result.total}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
