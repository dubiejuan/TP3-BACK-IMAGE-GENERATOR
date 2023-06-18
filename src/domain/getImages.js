const { getImages } = require('../infra/imageDB')

const getAllImage = async ({userId }) => getImages({userId})


module.exports = {getAllImage}