let images = [{
  id: '917bf5c29c6f42c088aac1604365d3a6',
  url: '/IGkLZ0muQ9YurFyosONFkyJpqM93/permanent/917bf5c29c6f42c088aac1604365d3a6.png',
  original: true,
  imagePrompt: 'Luffy de la serie de One Piece saltando un barco the barba negra en oro',
  userId: 'IGkLZ0muQ9YurFyosONFkyJpqM93',
},
  
{
  id: "1827e5c2419f4a4dabdd26c2a04fe18f",
  url: "/IGkLZ0muQ9YurFyosONFkyJpqM93/temporary/1827e5c2419f4a4dabdd26c2a04fe18f.png",
  original: false,
  imagePrompt: "Luffy de la serie de One Piece saltando un barco ",
  userId: "IGkLZ0muQ9YurFyosONFkyJpqM93"
}
             
          ];

let temporaryImages = [];

// let temporaryImages = [
//   {
//     id: '917bf5c29c6f42c088aac1604365d3a6',
//     url: '/IGkLZ0muQ9YurFyosONFkyJpqM93/temporary/917bf5c29c6f42c088aac1604365d3a6.png',
//     original: true,
//     imagePrompt: 'Luffy de la serie de One Piece saltando un barco the barba negra en oro',
//     userId: 'IGkLZ0muQ9YurFyosONFkyJpqM93'
//   },
//   {
//     id: "1827e5c2419f4a4dabdd26c2a04fe18f",
//     url: "/IGkLZ0muQ9YurFyosONFkyJpqM93/temporary/1827e5c2419f4a4dabdd26c2a04fe18f.png",
//     original: false,
//     imagePrompt: "Luffy de la serie de One Piece saltando un barco the barba negra en oro",
//     userId: "IGkLZ0muQ9YurFyosONFkyJpqM93"
//   }
// ];

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
    if (images[i].id === id) {
      return images[i];
    }
  }
}

const deleteImage = ({ id }) => {
  images = images.filter(image => image.id !== id);
}

const createTemporaryImage = ({ id, url, original, imagePrompt, userId }) => {
  let newImage = {
    id, url, original, imagePrompt, userId
  };
  temporaryImages.push(newImage);

}

const getTemporaryImages = ({ userId }) => {
  return temporaryImages.filter(image => image.userId == userId)
}

const getTemporaryImage = ({ id }) => {
  return temporaryImages.filter(image => image.id == id)
}


const readTemporaryImage = ({ id }) => {
  for (let i = 0; i < temporaryImages.length; i++) {
    if (temporaryImages[i].id === id) {
      return temporaryImages[i];
    }
  }
}

const deleteAllTemporaryImages = ({ userId }) => {
  temporaryImages = temporaryImages.filter(image => image.userId !== userId);
}

module.exports = { getTemporaryImage, getTemporaryImages, getImages, createImage, readImage, readTemporaryImage, deleteAllTemporaryImages, deleteImage, createTemporaryImage }