import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch all results
        const resultsSnapshot = await getDocs(collection(db, 'results'));
        const resultsData = [];

        // Fetch courses to map courseId to title
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const courses = {};
        coursesSnapshot.forEach(doc => {
          courses[doc.id] = doc.data().title;
        });
        setCoursesMap(courses);

        for (const docSnap of resultsSnapshot.docs) {
          const result = docSnap.data();
          resultsData.push({ id: docSnap.id, ...result });
        }
        setResults(resultsData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch results:', err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return <p>Loading results...</p>;
  }

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
            <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
          </header>
          <h2>User Test Results</h2>
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            results.map((result) => (
              <div key={result.id} style={{ border: '1px solid #ccc', marginBottom: '15px', padding: '10px' }}>
                <p><strong>Course:</strong> {coursesMap[result.courseId] || 'Unknown'}</p>
                <p><strong>User:</strong> {result.userEmail || 'Unknown'}</p>
                <div>
                  <strong>Questions:</strong>
                  <ul>
                    {result.answers && result.answers.map((answer, index) => (
                      <li key={index}>
                        Question: {answer.questionText} - 
                        {answer.isCorrect ? (
                          <span style={{ color: 'green' }}> Correct</span>
                        ) : (
                          <span style={{ color: 'red' }}> Wrong</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ViewResults;
