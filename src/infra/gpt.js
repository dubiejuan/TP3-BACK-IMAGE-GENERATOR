require('dotenv').config()

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


const generateVariant = async ({ imagePNG }) => {

  const createImageRequest = {
    "image": imagePNG,
    "n": 1,
    "size": "256x256",
    "response_format": "b64_json"
  }

  const response = await openai.createImageVariation(createImageRequest)

  return response.data.data
}


module.exports = { generateImage, generateVariant }