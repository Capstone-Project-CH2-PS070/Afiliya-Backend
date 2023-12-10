const crypto = require("crypto");
const { Op } = require("sequelize");
const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const path = require("path");

const User = require("../models/UsersModel");

dotenv.config();

let projectId = process.env.PROJECT_ID;
let keyFilename = path.join(__dirname, process.env.KEY_FILE_NAME);
let myBucket = process.env.USER_BUCKET;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(myBucket);

const createUser = async (req, res) => {
  console.log("Processing /create-user");

  try {
    const {
      fullname,
      email,
      password,
      telephone,
      gender,
      birthplace,
      birthdate,
    } = req.body;

    // Checking user data
    const isUser = await User.findOne({
      where: {
        [Op.or]: [{ telephone: telephone }, { email: email }],
      },
    });

    if (isUser) {
      return res.status(409).json({ msg: "User already exists" });
    } else {
      /*
            Apply here the method to send the verification code to the user
      */
      const isVerified = true; // coba verifikasi: true (sudah) / false (belum)

      if (isVerified) {
        const userId = crypto.randomBytes(16).toString("hex");

        await User.create({
          user_id: userId,
          fullname: fullname,
          email: email,
          password: password,
          telephone: telephone,
          gender: gender,
          birthplace: birthplace,
          birthdate: birthdate,
        });

        console.log("Data successfully saved to the database");
        return res.status(201).json({ msg: "User Created!" });
      } else {
        return res.status(422).json({ msg: "Failed verification!" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
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
      res.status(404).json({ msg: "User not found!" });
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
          .replace(`${(bucketName, fileName)}/`, "")
          .split("/");

        const bucketObj = storage.bucket(bucketName);
        const file = bucketObj.file(fileName);

        await file.delete();
      }
    };

    if (req.file) {
      await deleteImageFromBucket(user.image);

      const image = crypto.randomBytes(16).toString("hex");
      const fileName = `${image}.jpeg`;

      blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on("finish", () => {
          resolve();
        });

        blobStream.on("error", (error) => {
          reject(error);
        });
        blobStream.end(req.file.buffer);
      });
    }

    const userImage = blob
      ? `${blob.storage.apiEndpoint}/${myBucket}/${blob.name}`
      : null;

    const { fullname, email, telephone, gender, birthplace, birthdate } =
      req.body;

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

      await ShopsModel.save();
      res.status(200).json({ msg: "User Updated!" });
    } else {
      res.status(400).json({ msg: "Invalid Data!" });
    }
  } catch (error) {
    res.staus(500).json({ msg: error.message });
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
      return res.status(404).json({ msg: "User not found!" });
    }

    if (user.image) {
      const [bucketName, fileName] = user.image
        .replace(`${bucket.storage.apiEndpoint}/`, "")
        .split("/");

      const bucketObj = storage.bucket(bucketName);
      const file = bucketObj.file(fileName);

      await file.delete();
    }
    await User.destroy({
      where: {
        user_id: userId,
      },
    });

    res.status(200).json({ msg: "User Deleted!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
};
