const express = require('express');
const Multer = require('multer');

const {
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
} = require('../controllers/UserControllers');

const { sendOTPTelephone, verificationOTPTelephone } = require('../controllers/auth/GenerateOTPTelephone');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const router = express.Router();
const upload = Multer();

router.post('/users/telephones_otp', sendOTPTelephone);
router.post('/users/telephones_verification', verificationOTPTelephone);
router.post('/users/create-user', upload.none(), createUser);
router.get('/users/:id', getUserByID);
router.patch('/users/:id/update', multer.single('userImage'), updateUser);
router.delete('users/:id', deleteUser);

module.exports = router;
