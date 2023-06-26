require('dotenv').config()

const { S3 } = require('aws-sdk');

const s3Client = new S3({ region: 'us-east-1', accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_KEY });

const transformTobase64Data = (image) => new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

const putObjectToS3 = async ({ image, operationType }) => {

  try {

    const filename = `${image.id}.png`;
    const path = `/${image.userId}/${operationType}`;
    const bucket = `searchu`;
    const params = {
      Bucket: `${bucket}${path}`,
      Key: filename,
      Body: transformTobase64Data(image.b64),
      ContentEncoding: 'base64',
      ContentType: `image/png`
    };

    await s3Client.putObject(params).promise();

    image.url = `${path}/${filename}`

    return image;
  } catch (e) {
    console.log(e);
  }

};


const moveObject = async ({ image }) => {
  const { url } = image;
  const copySource = url; // Source path of the object to copy

  // Replace 'temporary' with 'permanent' in the URL
  const bucketToSave = copySource.replace('/temporary/', '/permanent/');

  const params = {
    Bucket: `searchu${removeFileNameFromPath(bucketToSave)}`, // Extract the bucket name from the URL
    CopySource: `searchu${copySource}`,
    Key: keepOnlyFileName(url) // Destination key (object name) in the 'permanent' folder
  };
  s3Client.copyObject(params).promise(); // Copy the object to the 'permanent' folder
  image.url = `${removeFileNameFromPath(bucketToSave)}/${removeFileNameFromPath(keepOnlyFileName(url))}`
  return image
};





const getObjectS3 = async ({ url }) => {
  try {
    const params = {
      Bucket: `searchu${removeFileNameFromPath(url)}`,
      Key: keepOnlyFileName(url)
    };

    return s3Client.getObject(params).promise();
  } catch (error) {
    console.log(error)
  }

};

function keepOnlyFileName(path) {
  const lastIndex = path.lastIndexOf('/');
  if (lastIndex !== -1) {
    return path.substring(lastIndex + 1);
  }
  return path;
}


function removeFileNameFromPath(path) {
  const lastIndex = path.lastIndexOf('/');
  if (lastIndex !== -1) {
    return path.substring(0, lastIndex);
  }
  return path;
}

module.exports = { putObjectToS3, getObjectS3, moveObject };