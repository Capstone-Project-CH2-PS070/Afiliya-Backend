const express = require('express');
const Multer = require('multer');

const {
  getAllProducts,
  getProductByID,
  getProductByName,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/ProductControllers');

const { verificationProductImage } = require('../utils/MachineLearning');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductByID);
router.get('/products/name/:name', getProductByName);
router.get('/products/category/:category', getProductByCategory);
// router.get('/products/shop/:id', getProductByShopId);
router.post('/create-product', multer.single('imageFile'), createProduct);
router.patch('/products/:id/update', multer.single('imageFile'), updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/products/verification-image', multer.none(), (req, res) => {
  verificationProductImage(req, res);
});

module.exports = router;
