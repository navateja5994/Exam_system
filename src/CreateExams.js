import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';

const CreateExams = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesList);
    } catch (err) {
      setError('Failed to load courses: ' + err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestionToList = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!selectedCourse || !questionText.trim() || options.some(opt => !opt.trim())) {
      setError('Please fill in all fields.');
      return;
    }
    const newQuestion = {
      courseId: selectedCourse,
      questionText,
      options,
      correctAnswerIndex
    };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex(0);
    setSuccess('Question added to list!');
  };

  const handleSubmitAllQuestions = async () => {
    setError('');
    setSuccess('');
    if (questions.length === 0) {
      setError('No questions to submit.');
      return;
    }
    try {
      for (const question of questions) {
        await addDoc(collection(db, 'exams'), question);
      }
      setSuccess('All questions submitted successfully!');
      setQuestions([]);
    } catch (err) {
      setError('Failed to submit questions: ' + err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
      setSuccess('Course deleted successfully.');
      fetchCourses(); // Refresh course list
    } catch (err) {
      setError('Failed to delete course: ' + err.message);
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
            <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
          </header>
          <h2>Create Exams</h2>
          <form onSubmit={handleAddQuestionToList}>
            <div>
              <label>Select Course:</label><br />
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
                <option value="">-- Select a course --</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Question Text:</label><br />
              <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
            </div>
            <div>
              <label>Options:</label><br />
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                  style={{ display: 'block', marginBottom: '5px' }}
                />
              ))}
            </div>
            <div>
              <label>Correct Answer:</label><br />
              <select
                value={correctAnswerIndex}
                onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
                required
              >
                {options.map((_, index) => (
                  <option key={index} value={index}>{`Option ${index + 1}`}</option>
                ))}
              </select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="submit" style={{ marginTop: '10px' }}>Add Question to List</button>
          </form>

          {questions.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Questions to be submitted:</h3>
              <ul>
                {questions.map((q, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <strong>Q{idx + 1}:</strong> {q.questionText}
                    <ul>
                      {q.options.map((opt, i) => (
                        <li key={i} style={{ color: i === q.correctAnswerIndex ? 'green' : 'black' }}>
                          {opt} {i === q.correctAnswerIndex ? '(Correct)' : ''}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <button onClick={handleSubmitAllQuestions} style={{ marginTop: '10px' }}>
                Submit All Questions
              </button>
            </div>
          )}
        </div>

        {/* Course List with Actions */}
        <div style={{
          maxWidth: '500px',
          margin: '20px auto',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          textAlign: 'left',
          backgroundColor: 'transparent'  // changed from 'rgba(255, 255, 255, 0.8)'
        }}>

          <h3>Courses List</h3>
          {courses.length === 0 ? (
            <p>No courses available.</p>
          ) : (
            courses.map(course => (
              <div key={course.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <strong>{course.title}</strong><br />
                <span>{course.description}</span><br />
                <span>Duration: {course.duration}</span><br />
                <button onClick={() => navigate(`/admin/exam/${course.id}`)} style={{ marginRight: '10px' }}>
                  View Test
                </button>
                <button onClick={() => handleDeleteCourse(course.id)} style={{ color: 'red' }}>
                  Delete Course
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CreateExams;
