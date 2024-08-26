// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to QR Code App</h1>
      <button onClick={() => navigate('/scan')} style={{ margin: '10px' }}>
        Scan QR Codes
      </button>
      <button onClick={() => navigate('/upload')} style={{ margin: '10px' }}>
        Upload QR Code
      </button>
      <button onClick={() => navigate('/library')} style={{ margin: '10px' }}>
        Check Library
      </button>
    </div>
  );
};

export default Home;
