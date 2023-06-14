const firebase = require('../libs/firebase');

const tokenDecoder = async (token) => {
  const firebaseAdmin = await firebase.getInstance();
  return firebaseAdmin.auth().verifyIdToken(token);
};
module.exports = { tokenDecoder };