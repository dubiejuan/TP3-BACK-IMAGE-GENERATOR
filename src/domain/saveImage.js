const { createImage, readTemporaryImage, getImages, deleteAllTemporaryImages } = require('../infra/imageDB')
const { moveObject } = require('../infra/S3')

const saveImage = async ({ id, userId }) => {

  try {
    const image = readTemporaryImage({ id })

    savedImage = await moveObject({ image })

    createImage(savedImage)

    deleteAllTemporaryImages({ userId })

    console.log(getImages({ userId }))
  } catch (error) {
    throw error;
  }

}


module.exports = { saveImage }