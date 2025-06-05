import React from 'react';
import videoSrc from './video.mp4';

const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -1,
      }}
      src={videoSrc}
      type="video/mp4"
    />
  );
};

export default BackgroundVideo;
