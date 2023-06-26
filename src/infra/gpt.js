require('dotenv').config()
const fs = require('fs');
const { generateUUID } = require('../libs/generateUUID')


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.ORG,
  apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);


const generateImage = async ({ imagePrompt }) => {

  try {
    const createImageRequest = {
      "prompt": imagePrompt,
      "n": 1,
      "size": "256x256",
      "response_format": "b64_json"
    }

    const response = await openai.createImage(createImageRequest)

    return response.data.data
  } catch (error) {
    //console.log(error)
    throw error
  }

}


const generateVariant = async ({ s3Image }) => {

  try {


    const name = generateUUID();


    fs.writeFileSync(`img/${name}.png`, s3Image.Body);

    const response = await openai.createImageVariation(
      fs.createReadStream(`img/${name}.png`),
      1,
      "256x256",
      "b64_json"
    );

    fs.unlinkSync(`img/${name}.png`);

    return response.data.data


  } catch (error) {
    console.log(error)
    throw error;

  }

}


module.exports = { generateImage, generateVariant }