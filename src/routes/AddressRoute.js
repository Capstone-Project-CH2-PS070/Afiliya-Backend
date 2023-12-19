const express = require('express');
const Multer = require('multer');

const multer = Multer();

const {
  createUserAddress,
  getAddressesByUserId,
  updateAddressByAddressId,
  deleteUserAddress,
} = require('../controllers/AddressControllers');

const router = express.Router();

router.get('/user/:id/address/', getAddressesByUserId);
router.patch('/user/address/:id', multer.none(), updateAddressByAddressId);
router.post('/user/address', multer.none(), createUserAddress);
router.delete('/user/address/:id', deleteUserAddress);

module.exports = router;
