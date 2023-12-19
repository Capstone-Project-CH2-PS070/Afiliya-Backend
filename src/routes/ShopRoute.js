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

router.get('/shop', getAllShops);
router.get('/shop/:id', getShopByID);
router.get('/shop/name/:name', getShopByName);
router.post('/create-shop', multer.single('shopImage'), createShop);
router.patch('/shop/:id/update', multer.single('shopImage'), updateShop);
router.delete('/shop/:id', deleteShop);

module.exports = router;
