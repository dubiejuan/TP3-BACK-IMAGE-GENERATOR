const gpt = require('../infra/gpt')
const { generateUUID } = require('../libs/generateUUID')
const { createTemporaryImage, getTemporaryImages, getTemporaryImage } = require('../infra/imageDB')
const { putObjectToS3, getObjectS3 } = require('../infra/S3')


const generateNewVariant = async ({ id, userId }) => {

  try {
    const tempImage = getTemporaryImage({ id })

    const s3Image = await getObjectS3({ url: tempImage[0].url })

    let image = await gpt.generateVariant({ s3Image })

    const imageGenerated = {
      id: generateUUID(),
      url: "",
      original: false,
      userId,
      imagePrompt: tempImage[0].imagePrompt,
      b64: image[0].b64_json
    }

    newImage = await putObjectToS3({ image: imageGenerated, operationType: 'temporary' })


    createTemporaryImage(newImage)


    return getTemporaryImages({ userId: newImage.userId })
  } catch (error) {

    throw error
  }

}


module.exports = { generateNewVariant }