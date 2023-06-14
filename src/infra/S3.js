const { S3 } = require('aws-sdk');
const { generateUUID } = require('../libs/generateUUID');

const s3Client = new S3({ region: 'us-east-1' });

const transformTobase64Data = (image) => new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

const putObjectToS3 = async ({ image, type, sector, operationType }) => {
};

const deleteObjectToS3 = async ({ imageData }) => {
};

const getObjectToS3 = async ({ type, sector }) => {
};

module.exports = { putObjectToS3, getObjectToS3, deleteObjectToS3, moveObject };