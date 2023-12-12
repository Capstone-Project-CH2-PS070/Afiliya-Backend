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

router.get('/users/:id/address/', getAddressesByUserId);
router.patch('/users/address/:id', multer.none(), updateAddressByAddressId);
router.post('/users/address', multer.none(), createUserAddress);
router.delete('/users/address/:id', deleteUserAddress);

module.exports = router;
