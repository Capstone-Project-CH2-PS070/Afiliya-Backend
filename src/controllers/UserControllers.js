const crypto = require('crypto');
const { Op } = require('sequelize');
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const path = require('path');

const User = require('../models/UsersModel');

dotenv.config();

const projectId = process.env.PROJECT_ID;
const keyFilename = path.join(__dirname, process.env.KEY_FILE_NAME);
const myBucket = process.env.USER_BUCKET;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(myBucket);

const createUser = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      gender,
      birthplace,
      birthdate,
    } = req.body;

    // Checking user data
    const isUser = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });

    if (isUser) {
      return res.status(409).json({ msg: 'User already exists' });
    }
    /*
            Apply here the method to send the verification code to the user
      */
    const isVerified = true; // coba verifikasi: true / false

    if (isVerified) {
      const userId = crypto.randomBytes(16).toString('hex');

      await User.create({
        user_id: userId,
        fullname,
        email,
        password,
        gender,
        birthplace,
        birthdate,
      });

      console.log('Data successfully saved to the database');
      return res.status(201).json({ msg: 'User Created!' });
    }
    return res.status(422).json({ msg: 'Failed verification!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getUserByID = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: 'User not found!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let blob;
    const user = await User.findOne({
      where: {
        user_id: req.params.id,
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
      await deleteImageFromBucket(user.image);

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

    const userImage = blob
      ? `${blob.storage.apiEndpoint}/${myBucket}/${blob.name}`
      : null;

    const {
      fullname, email, telephone, gender, birthplace, birthdate,
    } = req.body;

    if (user) {
      user.fullname = fullname;
      user.email = email;
      user.telephone = telephone;
      user.gender = gender;
      user.birthplace = birthplace;
      user.birthdate = birthdate;

      if (userImage) {
        user.image = userImage;
      }

      await user.save();
      res.status(200).json({ msg: 'User Updated!' });
    } else {
      res.status(400).json({ msg: 'Invalid Data!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: {
        user_id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    if (user.image) {
      const [bucketName, fileName] = user.image
        .replace(`${bucket.storage.apiEndpoint}/`, '')
        .split('/');

      const bucketObj = storage.bucket(bucketName);
      const file = bucketObj.file(fileName);

      await file.delete();
    }
    await User.destroy({
      where: {
        user_id: userId,
      },
    });

    return res.status(200).json({ msg: 'User Deleted!' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
};
