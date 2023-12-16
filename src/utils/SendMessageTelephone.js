const { MessageMedia } = require('whatsapp-web.js');

const SendMessageTelephone = async ({
  client, to, body, mediaUrl,
}) => {
  try {
    if (mediaUrl) {
      const media = new MessageMedia('image/png', mediaUrl);
      await client.sendMessage(to, media, { caption: body });
    } else {
      await client.sendMessage(to, body);
    }

    console.log(`Message sent to ${to}: ${body}`);
    return true;
  } catch (error) {
    console.error(`Error sending message to ${to}:`, error);
    throw error;
  }
};

module.exports = SendMessageTelephone;
