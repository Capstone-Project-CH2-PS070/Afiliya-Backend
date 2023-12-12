const crypto = require('crypto');
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const path = require('path');

const Product = require('../models/ProductsModel');

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
  console.log('Memproses /create-product');
  try {
    let blob;

    if (req.file) {
      console.log('File ditemukan, mencoba untuk upload');

      const image = crypto.randomBytes(16).toString('hex'); // Menghasilkan string hex sepanjang 32 karakter
      const fileName = `${image}.jpeg`;

      blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
          console.log('Unggahan ke Bucket selesai!');
          resolve();
        });

        blobStream.on('error', (error) => {
          console.error('Error saat mengunggah file:', error);
          reject(error);
        });

        blobStream.end(req.file.buffer);
      });
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

    // function (untuk integrasi model ML){

    // if ( verifikasi berhasil ) :
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

    console.log('Data berhasil disimpan di Database');
    res.status(201).json({ msg: 'Product Created!', data: response });

    // endif
  // }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getAllProducts = async (req, res) => {
  console.log('Mendapatkan Data Product');
  try {
    const response = await Product.findAll();
    res.status(200).json({ msg: 'Loading all product successfully!', data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
      res.status(404).json({ msg: 'Product tidak ditemukan!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.body;

    // Pastikan nama memiliki minimal 3 huruf sebelum memulai pencarian
    if (name && name.length >= 3) {
      const regex = new RegExp(name, 'i'); // 'i' membuat pencarian menjadi case-insensitive

      // Gunakan regex untuk mencari produk yang memiliki nama serupa
      const response = await Product.find({ name: { $regex: regex } });

      res.status(200).json({ msg: 'Loading all product by name successfully!', data: response });
    } else {
      res.status(400).json({ error: 'Nama produk harus memiliki minimal 3 huruf.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
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
      res.status(200).json({ msg: 'Loading all product by Category successfully!', data: response });
    } else {
      res.status(404).json({ msg: 'Product tidak ditemukan!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

    // Fungsi untuk menghapus file gambar dari bucket
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
      console.log('File ditemukan, mencoba untuk upload');

      // Hapus gambar lama dari bucket sebelum mengunggah gambar baru
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
      // Memperbarui properti yang tidak berubah pada gambar produk
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

      // Jika ada file baru, perbarui properti gambar
      if (productImage) {
        product.product_image = productImage;
      }

      await product.save(); // Menggunakan metode save untuk menyimpan perubahan
      res.status(200).json({ msg: 'Product Updated!' });
    } else {
      res.status(404).json({ msg: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Hapus file gambar di bucket jika ada
    if (product.product_image) {
      const [bucketName, fileName] = product.product_image
        .replace(`${bucket.storage.apiEndpoint}/`, '')
        .split('/');

      const bucketObj = storage.bucket(bucketName);
      const file = bucketObj.file(fileName);

      await file.delete();
    }

    // Hapus produk dari database
    await Product.destroy({
      where: {
        product_id: productId,
      },
    });

    return res.status(200).json({ msg: 'Product Deleted!' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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
