let images = [];
let temporaryImages = [];

const createImage = ({ id, url, original, imagePrompt, userId }) => {
  let newImage = {
    id, original, url, imagePrompt, userId
  };
  images.push(newImage);
}

const getImages = ({ userId }) => {
  return images.filter(image => image.userId == userId)
}

const readImage = ({ id }) => {
  for (let i = 0; i < images.length; i++) {
    if (images[i].id === id && images[i].userId) {
      return images[i];
    }
  }
}

const deleteImage = ({ id }) => {
  images = images.filter(image => image.id !== id);
}

const createTemporaryImage = ({ id, url, original, imagePrompt, userId, b64 }) => {
  let newImage = {
    id, url, original, imagePrompt, userId, b64
  };
  temporaryImages.push(newImage);
}

const getTemporaryImages = ({ userId }) => {
  return images.filter(image => image.userId == userId)
}


const readTemporaryImage = ({ id }) => {
  for (let i = 0; i < temporaryImages.length; i++) {
    if (temporaryImages[i].ID === id) {
      return temporaryImages[i];
    }
  }
}

const deleteAllTemporaryImages = ({ userId }) => {
  temporaryImages = temporaryImages.filter(image => image.userId !== userId);
}

module.exports = { getTemporaryImages, getImages, createImage, readImage, readTemporaryImage, deleteAllTemporaryImages, deleteImage, createTemporaryImage }