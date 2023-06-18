const { createImage,readTemporaryImage,getImages } = require('../infra/imageDB')
const {moveObject } = require('../infra/S3')

const saveImage = async ({ id,userId }) => {

  const image = readTemporaryImage({id})
   
  savedImage = await moveObject({image})

  createImage(savedImage)

  console.log(getImages({userId}))
}


module.exports = {saveImage}