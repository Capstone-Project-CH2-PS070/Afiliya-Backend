const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const crypto = require('crypto');
const OTPTelephone = require('../../models/GenerateOTPTelephoneModel');
const generateOTP = require('../../utils/GenerateOTP');
const SendMessageTelephone = require('../../utils/SendMessageTelephone');
const { hashData, verifyHashedData } = require('../../utils/HashData');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();

const verificationOTPTelephone = async ({ telephone, otp }) => {
  if (!(telephone && otp)) {
    throw new Error('Provide values for telephone and otp');
  }

  const matchedOTPRecord = await OTPTelephone.findOne({
    telephone,
  });

  console.log('Matched OTP Record:', matchedOTPRecord);

  if (!matchedOTPRecord) {
    throw new Error('No OTP records found.');
  }

  const { expiresAt } = matchedOTPRecord;

  if (expiresAt < Date.now()) {
    await OTPTelephone.destroy({ where: { telephone } });
    throw new Error('Code has expired. Request for a new one.');
  }

  const hashedOTP = matchedOTPRecord.otp;
  const validOTP = await verifyHashedData(otp, hashedOTP);
  return validOTP;
};

const sendOTPTelephone = async (req, res) => {
  try {
    const { telephone } = req.body;

    if (!telephone) {
      return res.status(400).json({ status: 'Fail', message: 'Provide a telephone number' });
    }

    let formattedTelephone = telephone;
    if (telephone.startsWith('0')) {
      formattedTelephone = `62${telephone.slice(1)}@c.us`;
    } else if (telephone.startsWith('62')) {
      formattedTelephone += '@c.us';
    } else {
      formattedTelephone = `62${telephone}@c.us`;
    }

    const userTelephone = await client.isRegisteredUser(formattedTelephone);

    if (!userTelephone) {
      return res.status(400).json({ status: 'Fail', message: 'WA number is not registered' });
    }

    const existingUser = await OTPTelephone.findOne({
      where: {
        telephone: formattedTelephone,
      },
    });

    const generatedOTP = await generateOTP();
    const hashedOTP = await hashData(generatedOTP);
    const userIdOTPTelephone = crypto.randomBytes(16).toString('hex');

    const messageTelephoneOptions = {
      client,
      to: formattedTelephone,
      body: `${generatedOTP} adalah kode verifikasi Anda. Demi keamanan, jangan bagikan kode ini. \n\nKode ini kedaluarsa dalam 5 menit.`,
    };
    await SendMessageTelephone(messageTelephoneOptions);

    if (existingUser) {
      existingUser.otp = hashedOTP;
      existingUser.createdAt = Date.now();
      existingUser.expiresAt = Date.now() + 300000;
      await existingUser.save();
      return res.json({ status: 'Success', updatedOTPRecord: existingUser });
    }

    const newUser = await OTPTelephone.create(
      {
        user_id_otp_telephone: userIdOTPTelephone,
        telephone: formattedTelephone,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 300000,
      },
    );

    return res.json({ status: 'Success', createdOTPRecord: newUser });
  } catch (error) {
    console.error('Error in sendOTPTelephone:', error);
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const deleteOTPTelephone = async (telephone) => {
  await OTPTelephone.destroy({ where: { telephone } });
};

module.exports = {
  verificationOTPTelephone,
  sendOTPTelephone,
  deleteOTPTelephone,
};
