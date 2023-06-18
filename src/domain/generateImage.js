
const gpt = require('../infra/gpt')
const { generateUUID } = require('../libs/generateUUID')
const { createTemporaryImage,getTemporaryImages } = require('../infra/imageDB')
const {putObjectToS3 } = require('../infra/S3')

const generateImage = async ({ imagePrompt,userId }) => {

  let image = await gpt.generateImage({ imagePrompt })

  const imageGenerated = {
    id: generateUUID(),
    url: "",
    original: true,
    userId,
    imagePrompt,
    b64: image[0].b64_json
  }

  newImage = await putObjectToS3({image:imageGenerated,operationType:'temporary'})

  createTemporaryImage(newImage)
  
  return getTemporaryImages({userId:newImage.userId})
}


module.exports = {generateImage}