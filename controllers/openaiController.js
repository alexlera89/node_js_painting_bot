const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-FCtAodh7rLyLNAzy1aKlhGZ7'
});
const openai = new OpenAIApi(configuration);

const generateImage = async (message) => {

  const imageSize = '256x256'
  prompt = message

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    return imageUrl
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    return 'The image could not be generated'
  }
};

module.exports = { generateImage };