const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const sendProductImageModule = async (fileName, method) => {
  try {
    console.log('Send data to machine learning..');
    const apiUrl = process.env.MACHINE_LEARNING_URL;

    const dataToSend = {
      Filename: fileName,
      Method: method,
    };
    console.log('data:', dataToSend);

    // Kirim permintaan POST ke API
    const response = await axios.post(apiUrl, dataToSend);

    console.log('Response from machine learning:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error sending data:', error.message);
    throw error;
  }
};

const verificationProductImage = async (req, res) => {
  try {
    const receivedData = req.body;

    console.log('Received Data:', receivedData);

    res.status(200).json({ message: 'Data received successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  sendProductImageModule,
  verificationProductImage,
};
