const gpt = require('../infra/gpt')
const { generateUUID } = require('../libs/generateUUID')
const { createTemporaryImage,getTemporaryImages,getTemporaryImage} = require('../infra/imageDB')
const {putObjectToS3,getObjectS3 } = require('../infra/S3')

const generateNewVariant = async ({ id }) => {


  const tempImage = getTemporaryImage({id})

  const data = await getObjectS3({url :tempImage[0].url})


  let image = await gpt.generateVariant({ imagePNG:data })

  const imageGenerated = {
    id: generateUUID(),
    url: "",
    original: false,
    userId,
    imagePrompt,
    b64: image[0].b64_json
  }

  newImage = await putObjectToS3({image:imageGenerated,operationType:'temporary'})

  createTemporaryImage(newImage)
  
  return getTemporaryImages({userId:newImage.userId})
}


module.exports = {generateNewVariant}