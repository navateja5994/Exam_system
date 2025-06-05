import React, { useState } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists() && userDoc.data().role === 'user') {
        navigate('/user/dashboard');
      } else {
        setError('Access denied: Not a user.');
        await auth.signOut();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <BackgroundVideo />
      <div style={{ position: 'relative', padding: '20px', textAlign: 'center', backgroundColor: 'transparent', minHeight: '100vh' }}>
        <div style={{
          maxWidth: '400px',
          margin: '40px auto',
          padding: '30px',
          backgroundColor: 'transparent',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          textAlign: 'left'
        }}>
          <header>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </header>
          <h2>User Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label><br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                required
              />
            </div>
            <div>
              <label>Password:</label><br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="neon-button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
