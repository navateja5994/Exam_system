import React from 'react';

const SVGBackground = () => {
  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'visible',
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff416c" />
          <stop offset="100%" stopColor="#ff4b2b" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="300" r="200" fill="url(#grad1)">
        <animate
          attributeName="cx"
          values="300; 400; 300"
          dur="10s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="300; 400; 300"
          dur="10s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="1100" cy="600" r="250" fill="url(#grad2)" opacity="0.7">
        <animate
          attributeName="cx"
          values="1100; 1000; 1100"
          dur="12s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="600; 500; 600"
          dur="12s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default SVGBackground;
