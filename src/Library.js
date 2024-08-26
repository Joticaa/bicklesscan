// src/Library.js
import React, { useEffect, useState } from 'react';
import { getAllQRCodes, deleteQRCode } from './db';

const Library = () => {
  const [qrCodes, setQRCodes] = useState([]);

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    const codes = await getAllQRCodes();
    setQRCodes(codes);
  };

  const handleDelete = async (id) => {
    await deleteQRCode(id);
    fetchQRCodes(); // Refresh the list after deletion
  };

  return (
    <div>
      <h1>Library</h1>
      {qrCodes.length === 0 ? (
        <p>No QR codes in the library.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bickles Number</th>
              <th>Fastenal Number</th>
              <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {qrCodes.map((qrCode) => (
              <tr key={qrCode.id}>
                <td>{qrCode.bicklesNumber}</td>
                <td>{qrCode.fastenalNumber}</td>
                <td>{qrCode.qrText}</td>
                <td>
                  <button onClick={() => handleDelete(qrCode.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Library;
