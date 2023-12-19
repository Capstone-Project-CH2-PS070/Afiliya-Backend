const crypto = require('crypto');
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const path = require('path');

const Product = require('../models/ProductsModel');

const { sendProductImageModule, verificationProductImage } = require('../utils/MachineLearning');

dotenv.config();

const projectId = process.env.PROJECT_ID;
const keyFilename = path.join(__dirname, process.env.KEY_FILE_NAME);
const myBucket = process.env.PRODUCT_BUCKET;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(myBucket);

const createProduct = async (req, res) => {
  try {
    let blob;

    if (req.file) {
      const image = crypto.randomBytes(16).toString('hex');
      const fileName = `${image}.jpeg`;

      blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
          resolve();
        });

        blobStream.on('error', (error) => {
          reject(error);
        });

        blobStream.end(req.file.buffer);
      });

      await sendProductImageModule(fileName);
    }

    const {
      shopId,
      productName,
      productPrice,
      productStock,
      productCtg,
      weight,
      width,
      size,
      height,
      description,
    } = req.body;
    const productImage = blob
      ? `${blob.storage.apiEndpoint}/${myBucket}/${blob.name}`
      : null;

    const verifiedProductImage = await verificationProductImage();

    if (verifiedProductImage) {
      const productId = crypto.randomBytes(16).toString('hex');
      const response = await Product.create({
        product_id: productId,
        shop_id: shopId,
        product_name: productName,
        product_price: productPrice,
        product_image: productImage,
        product_stock: productStock,
        product_ctg: productCtg,
        weight,
        size,
        height,
        width,
        description,
      });

      res.status(201).json({ message: 'Product Created!', data: response });
    } else {
      res.status(400).json({ message: 'invalid, due to poor image quality!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json({ message: 'Loading all product successfully!', data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByID = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        product_id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Product not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.body;

    if (name && name.length >= 3) {
      const regex = new RegExp(name, 'i');
      const response = await Product.find({ name: { $regex: regex } });

      res.status(200).json({ message: 'Loading all product by name successfully!', data: response });
    } else {
      res.status(400).json({ message: 'The product name must have at least 3 letters.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        product_ctg: req.params.category,
      },
    });
    if (response) {
      res.status(200).json({ message: 'Loading all product by Category successfully!', data: response });
    } else {
      res.status(404).json({ message: 'Product not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    let blob;
    const product = await Product.findOne({
      where: {
        product_id: req.params.id,
      },
    });

    const deleteImageFromBucket = async (imageUrl) => {
      if (imageUrl) {
        const [bucketName, fileName] = imageUrl
          .replace(`${bucket.storage.apiEndpoint}/`, '')
          .split('/');

        const bucketObj = storage.bucket(bucketName);
        const file = bucketObj.file(fileName);

        await file.delete();
      }
    };

    if (req.file) {
      await deleteImageFromBucket(product.product_image);

      const image = crypto.randomBytes(16).toString('hex');
      const fileName = `${image}.jpeg`;

      blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
          resolve();
        });

        blobStream.on('error', (error) => {
          reject(error);
        });

        blobStream.end(req.file.buffer);
      });
    }

    const productImage = blob
      ? `${blob.storage.apiEndpoint}/${myBucket}/${blob.name}`
      : null;

    const {
      shopId,
      productName,
      productPrice,
      productStock,
      productCtg,
      weight,
      width,
      size,
      height,
      description,
    } = req.body;

    if (product) {
      product.shop_id = shopId || product.shop_id;
      product.product_name = productName || product.product_name;
      product.product_price = productPrice || product.product_price;
      product.product_stock = productStock || product.product_stock;
      product.product_ctg = productCtg || product.product_ctg;
      product.weight = weight || product.weight;
      product.width = width || product.width;
      product.size = size || product.size;
      product.height = height || product.height;
      product.description = description || product.description;

      if (productImage) {
        product.product_image = productImage;
      }

      await product.save();
      res.status(200).json({ message: 'Product Updated!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({
      where: {
        product_id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    if (product.product_image) {
      const [bucketName, fileName] = product.product_image
        .replace(`${bucket.storage.apiEndpoint}/`, '')
        .split('/');

      const bucketObj = storage.bucket(bucketName);
      const file = bucketObj.file(fileName);

      await file.delete();
    }

    await Product.destroy({
      where: {
        product_id: productId,
      },
    });

    return res.status(200).json({ message: 'Product Deleted!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  getProductByName,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
