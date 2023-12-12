const Address = require('../models/AddressesModel');

const createUserAddress = async (req, res) => {
  try {
    const {
      userId,
      province,
      city,
      subDistrict,
      addressDetails,
      placename,
      recipientInfo,
    } = req.body;

    const response = await Address.create({
      user_id: userId,
      province,
      city,
      sub_district: subDistrict,
      address_details: addressDetails,
      placename,
      recipient_info: recipientInfo,
    });
    res.status(200).json({ msg: 'Address Created!', data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const getAddressesByUserId = async (req, res) => {
  try {
    const response = await Address.findAndCountAll({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'User Address found!', data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateAddressByAddressId = async (req, res) => {
  try {
    const userAddress = await Address.findOne({
      where: {
        address_id: req.params.id,
      },
    });
    const {
      province,
      city,
      subDistrict,
      addressDetails,
      placename,
      recipientInfo,
    } = req.body;

    if (userAddress) {
      userAddress.province = province || userAddress.province;
      userAddress.city = city || userAddress.city;
      userAddress.sub_district = subDistrict || userAddress.subDistrict;
      userAddress.addressDetails = addressDetails || userAddress.addressDetails;
      userAddress.placename = placename || userAddress.placename;
      userAddress.recipient_info = recipientInfo || userAddress.recipient_info;

      await userAddress.save();
      res.status(200).json({ msg: 'User Address Upadated!', data: userAddress });
    } else {
      res.status(400).json({ msg: 'Invalid address update!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUserAddress = async (req, res) => {
  const addressId = req.params.id;

  try {
    const userAddress = await Address.findOne({
      where: {
        address_id: addressId,
      },
    });
    if (!userAddress) {
      return res.status(404).json({ msg: 'Address not found!' });
    }
    await userAddress.destroy({
      where: {
        address_id: addressId,
      },
    });

    return res.status(200).json({ msg: 'Address Deleted!' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createUserAddress,
  getAddressesByUserId,
  updateAddressByAddressId,
  deleteUserAddress,
};
