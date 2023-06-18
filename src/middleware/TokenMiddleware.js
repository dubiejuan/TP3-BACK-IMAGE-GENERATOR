const firebase = require('../infra/firebase');

class TokenMiddleware {
  async decodeToken(req, res, next) {
    try {
      const token = req.headers?.authorization.replace('Bearer ', '');
      const firebaseAdmin = await firebase.getInstance();

      const { email, user_id } = await firebaseAdmin.auth().verifyIdToken(token);

      req.userId = user_id;
      req.email = email;
      return next();
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

module.exports = new TokenMiddleware();