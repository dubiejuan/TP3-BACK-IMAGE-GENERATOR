require('dotenv').config()
const createError = require('http-errors');
const admin = require("firebase-admin");

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain:  process.env.UNIVERSE_DOMAIN
};

class firebaseSingleton {
  fireInstance;
  getInstance = async () => {
    try {
      if (this.fireInstance === undefined) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        this.fireInstance = admin;
      }
      return this.fireInstance;
    } catch (e) {
      throw new createError.ServiceUnavailable(e);
    }
  };
}

const firebase = new firebaseSingleton();

module.exports = firebase;