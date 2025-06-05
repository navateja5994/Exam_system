import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundVideo />
      <div className="home-container">
        <header className="home-header">
          <button className="neon-button" onClick={() => navigate('/admin/login')}>Admin Login</button>
          <button className="neon-button" onClick={() => navigate('/admin/signup')}>Admin Signup</button>
          <button className="neon-button" onClick={() => navigate('/user/login')}>User Login</button>
          <button className="neon-button" onClick={() => navigate('/user/signup')}>User Signup</button>
        </header>
        <h1>Welcome to the Online Exam System</h1>
        <hr style={{ width: '60%', margin: '20px auto' }} />
        <h2>About the System Use</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
          In higher education, a course is a unit of teaching that typically lasts one academic term, is led by one or more instructors (teachers or professors), and has a fixed roster of students. A course usually covers an individual subject. Courses generally have a fixed program of sessions every week during the term, called lessons or classes. Students may receive a grade and academic credit after completion of the course. Courses can either be compulsory material or "elective". An elective is usually not a required course, but there are a certain number of non-specific electives that are required for certain majors. The entire collection of courses required to complete an academic degree is called a program (or programme) of studies.
        </p>
        <h2>About Code Languages</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
          A programming language is a system of notation for writing computer programs.[1] Programming languages are described in terms of their syntax (form) and semantics (meaning), usually defined by a formal language.
        </p>
      </div>
    </>
  );
};

export default Home;
