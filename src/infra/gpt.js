const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  organization: 'org-S75EJa4AfKNSoCOjs9cmmrom',
  apiKey: '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',

});

const openai = new OpenAIApi(configuration);


const generateImage = async ({ prompt }) => {

  const createImageRequest = {
    "prompt": prompt,
    "n": 1,
    "size": "256x256",
    "response_format": "b64_json"
  }

  const response = await openai.createImage(createImageRequest)

  return response.data.data
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