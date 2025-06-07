import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

const TakeTest = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, 'exams'), where('courseId', '==', courseId));
        const querySnapshot = await getDocs(q);
        const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Shuffle questionsList to jumble questions differently for each user
        const shuffledQuestions = questionsList
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        setQuestions(shuffledQuestions);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load questions:', err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [courseId]);

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let calculatedScore = 0;
    const answersArray = questions.map(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) calculatedScore++;
      return {
        questionId: q.id,
        questionText: q.questionText,
        selectedOption: selected,
        isCorrect
      };
    });

    try {
      await addDoc(collection(db, 'results'), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        courseId,
        answers: answersArray,
        score: calculatedScore,
        total: questions.length,
        timestamp: new Date()
      });
      setScore(calculatedScore);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit test:', err);
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (submitted) {
    return (
      <>
        <div style={{ position: 'relative', padding: '20px', textAlign: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
          <div style={{
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  textAlign: 'left',
  backgroundColor: 'rgba(255, 255, 255, 0.8)'  // 👈 changed from '#fff'
}}>
            <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => navigate('/user/dashboard')}>Back to Dashboard</button>
            </header>
            <h2>Test Submitted</h2>
            <p>Your score: {score} out of {questions.length}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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
          <h2>Take Test</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <div key={q.id} style={{ marginBottom: '15px' }}>
                <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
                {q.options.map((option, i) => (
                  <label key={i} style={{ display: 'block' }}>
                    <input
                      type="radio"
                      name={q.id}
                      value={i}
                      checked={answers[q.id] === i}
                      onChange={() => handleAnswerChange(q.id, i)}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit">Submit Test</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TakeTest;
