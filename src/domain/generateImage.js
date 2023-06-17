
const { generateImage } = require('../infra/gpt')
const { generateUUID } = require('../libs/generateUUID')
const { createTemporaryImage } = require('../infra/imageDB')
const { } = require('../infra/S3')

const generateImage = async ({ imagePrompt }) => {

  const image = await generateImage({ imagePrompt, userId })

  const imageGenerated = {
    id: generateUUID(),
    url: "",
    orginal: true,
    userId,
    b64: image[0].b64_json
  }


  createTemporaryImage(imageGenerated)
}