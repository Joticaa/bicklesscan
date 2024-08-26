// src/QrScannerComponent.js
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import jsQR from 'jsqr';
import { saveQRCode, getQRCode } from './db'; // Import getQRCode for checking

const QrScannerComponent = () => {
  const [scannedData, setScannedData] = useState(null);
  const [bicklesNumber, setBicklesNumber] = useState('');
  const [fastenalNumber, setFastenalNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleScan = async (scanData) => {
    if (scanData) {
      const qrText = scanData.text;
      const existingData = await getQRCode(qrText); // Check if the QR code already exists

      if (existingData) {
        // QR code already exists in the library
        setErrorMessage('This part already exists in the library.');
        setTimeout(() => {
          setErrorMessage(''); // Clear the error message after a few seconds
        }, 3000);
      } else {
        // New QR code, proceed to add to DB
        setScannedData(qrText);
        setShowModal(true);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const handleAddToDB = async () => {
    const timestamp = new Date().toISOString();
    const qrCodeData = {
      qrText: scannedData,
      bicklesNumber,
      fastenalNumber,
    };
    await saveQRCode(`qrCode-${timestamp}`, qrCodeData);

    // Reset states and close modal
    setScannedData(null);
    setBicklesNumber('');
    setFastenalNumber('');
    setShowModal(false);
  };

  const handleCancel = () => {
    // Reset states and close modal without saving
    setScannedData(null);
    setBicklesNumber('');
    setFastenalNumber('');
    setShowModal(false);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        constraints={{
            video: { facingMode: "environment" }
       }}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

      {/* Modal for adding QR code to the database */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add QR Code to Database</h2>
            <p>Scanned QR Code: {scannedData}</p>
            <label>
              Bickles Number:
              <input
                type="text"
                value={bicklesNumber}
                onChange={(e) => setBicklesNumber(e.target.value)}
              />
            </label>
            <br />
            <label>
              Fastenal Number:
              <input
                type="text"
                value={fastenalNumber}
                onChange={(e) => setFastenalNumber(e.target.value)}
              />
            </label>
            <br />
            <button onClick={handleAddToDB}>Add to DB</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrScannerComponent;
