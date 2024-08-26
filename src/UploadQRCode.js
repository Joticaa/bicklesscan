import React, { useState } from 'react';
import jsQR from 'jsqr';

const UploadQRCode = () => {
  const [data, setData] = useState('No result');
  const [byteData, setByteData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

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

      const encoder = new TextEncoder();
      const bytes = encoder.encode(code.data);
      setByteData(bytes);
    } else {
      console.log('No QR code found.');
    }
  };

  return (
    <div>
      <h1>Upload QR Code</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <p>Scanned Text: {data}</p>
      {byteData && <p>Bytes: {Array.from(byteData).join(', ')}</p>}
    </div>
  );
};

export default UploadQRCode;