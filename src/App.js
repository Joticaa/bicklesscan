// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import QrScannerComponent from './QrScannerComponent';
import UploadQRCode from './UploadQRCode';
import Library from './Library';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<QrScannerComponent />} />
        <Route path="/upload" element={<UploadQRCode />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
};

export default App;
