const express = require('express');
const Multer = require('multer');

const {
  createShop, getAllShops, getShopByID, getShopByName, updateShop, deleteShop,
} = require('../controllers/ShopControllers');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const router = express.Router();

router.get('/shops', getAllShops);
router.get('/shops/:id', getShopByID);
router.get('/shops/name/:name', getShopByName);
router.post('/create-shop', multer.single('shopImage'), createShop);
router.patch('/shops/:id/update', multer.single('shopImage'), updateShop);
router.delete('/shops/:id', deleteShop);

module.exports = router;
