// src/db.js
import Dexie from 'dexie';

const db = new Dexie('QRCodeDatabase');
db.version(1).stores({
  qrCodes: '++id, qrText, bicklesNumber, fastenalNumber',
});

// Function to save a new QR code to the database
export const saveQRCode = async (key, value) => {
  try {
    await db.qrCodes.add(value);
  } catch (error) {
    console.error('Error saving QR code:', error);
  }
};

// Function to get a QR code by its text from the database
export const getQRCode = async (qrText) => {
  try {
    return await db.qrCodes.get({ qrText });
  } catch (error) {
    console.error('Error retrieving QR code:', error);
    return null;
  }
};

// Function to get all QR codes from the database
export const getAllQRCodes = async () => {
  try {
    return await db.qrCodes.toArray();
  } catch (error) {
    console.error('Error retrieving all QR codes:', error);
    return [];
  }
};

// Function to delete a QR code by its ID from the database
export const deleteQRCode = async (id) => {
  try {
    await db.qrCodes.delete(id);
  } catch (error) {
    console.error('Error deleting QR code:', error);
  }
};
