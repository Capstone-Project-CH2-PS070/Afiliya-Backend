const express = require('express');
const Multer = require('multer');

const {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} = require('../controllers/ProductControllers');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // tidak boleh lebih dari 5mb
  },
});

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductByID);
router.post('/create-product', multer.single('imageFile'), createProduct);
router.patch('/products/:id/update', multer.single('imageFile'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
