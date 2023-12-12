const telephone = null;

const sendTelephone = async (telephoneOptions) => {
  try {
    await telephone.sendText(telephoneOptions);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = sendTelephone;
