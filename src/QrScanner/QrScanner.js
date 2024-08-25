import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import jsQR from 'jsqr';

const QrScannerComponent = () => {
  const [data, setData] = useState('No result');
  const [byteData, setByteData] = useState(null); // State to store the byte array
  const [imageSrc, setImageSrc] = useState(null); // State to store uploaded image
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera

  const handleScan = (scanData) => {
    if (scanData) {
      const text = scanData.text;
      setData(text);

      // Convert the text to bytes using TextEncoder
      const encoder = new TextEncoder();
      const bytes = encoder.encode(text);
      setByteData(bytes);  // Set the byte array in state or handle it as needed
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgElement = document.createElement('img');
        imgElement.src = event.target.result;
        imgElement.onload = () => {
          decodeQRCode(imgElement);
        };
      };
      reader.readAsDataURL(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const decodeQRCode = (imgElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      console.log('QR Code Data:', code.data);
      setData(code.data);

      // Convert the QR code data to bytes
      const encoder = new TextEncoder();
      const bytes = encoder.encode(code.data);
      setByteData(bytes);
    } else {
      console.log('No QR code found.');
    }
  };

  const toggleCamera = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode={facingMode}
      />
      <p>Scanned Text: {data}</p>
      {byteData && (
        <p>Bytes: {Array.from(byteData).join(', ')}</p>
      )}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <button onClick={toggleCamera}>
        Switch to {facingMode === 'user' ? 'Back' : 'Front'} Camera
      </button>
    </div>
  );
};

export default QrScannerComponent;
