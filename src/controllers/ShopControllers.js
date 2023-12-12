const crypto = require('crypto');
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const path = require('path');

const Shop = require('../models/ShopsModel');

dotenv.config();

const projectId = process.env.PROJECT_ID;
const keyFilename = path.join(__dirname, process.env.KEY_FILE_NAME);
const myBucket = process.env.SHOP_BUCKET;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(myBucket);

const createShop = async (req, res) => {
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
          console.error('Error saat mengunggah file:', error);
          reject(error);
        });

        blobStream.end(req.file.buffer);
      });
    }

    const {
      userId, shopName, shopCtg, telephone, address, description,
    } = req.body;

    const shopImage = blob
      ? `${blob.storage.apiEndpoint}/${myBucket}/${blob.name}`
      : null;

    const shopId = crypto.randomBytes(16).toString('hex');
    const response = await Shop.create({
      shop_id: shopId,
      user_id: userId,
      shop_name: shopName,
      shop_image: shopImage,
      shop_ctg: shopCtg,
      telephone,
      address,
      description,
    });
    res.status(201).json({ msg: 'Shop Created!', data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const getAllShops = async (req, res) => {
  try {
    const response = await Shop.findAll();
    res.status(200).json({ msg: 'Loading all shop successfully!', data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getShopByID = async (req, res) => {
  try {
    const response = await Shop.findOne({
      where: {
        shop_id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json({ msg: 'Shop found!', data: response });
    } else {
      res.status(404).json({ msg: 'Shop not found!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getShopByName = async (req, res) => {
  try {
    const response = await Shop.findOne({
      where: {
        shop_name: req.params.name,
      },
    });
    if (response) {
      res.status(200).json({ msg: 'Shop found!', data: response });
    } else {
      res.staus(404).json({ msg: 'Shop not found!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateShop = async (req, res) => {
  try {
    let blob;
    const shop = await Shop.findOne({
      where: {
        shop_id: req.params.id,
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
      await deleteImageFromBucket(shop.shop_image);

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

    const shopImage = blob
      ? `${blob.storage.apiEndpoint}/${myBucket}/${blob.name}`
      : null;

    const {
      shopName, shopCtg, telephone, address, description,
    } = req.body;

    if (shop) {
      shop.shop_name = shopName || shop.shop_name;
      shop.shop_ctg = shopCtg || shop.shop_ctg;
      shop.telephone = telephone || shop.telephone;
      shop.address = address || shop.address;
      shop.description = description || shop.description;

      if (shopImage) {
        shop.shop_image = shopImage;
      }

      const response = await shop.save();
      res.status(200).json({ msg: 'Shop Updated!', data: response });
    } else {
      res.status(400).json({ msg: 'Invalid shop update!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteShop = async (req, res) => {
  const shopId = req.params.id;

  try {
    const shop = await Shop.findOne({
      where: {
        shop_id: shopId,
      },
    });
    if (!shop) {
      return res.status(404).json({ msg: 'Shop not found!' });
    }

    if (shop.shop_image) {
      const [bucketName, fileName] = shop.shop_image
        .replace(`${bucket.storage.apiEndpoint}/`, '')
        .split('/');

      const bucketObj = storage.bucket(bucketName);
      const file = bucketObj.file(fileName);

      await file.delete();
    }
    await Shop.destroy({
      where: {
        shop_id: shopId,
      },
    });

    return res.status(200).json({ msg: 'Shop Deleted!' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createShop,
  getAllShops,
  getShopByID,
  getShopByName,
  updateShop,
  deleteShop,
};
