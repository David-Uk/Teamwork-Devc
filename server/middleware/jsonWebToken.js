import jwt from 'jsonwebtoken';
import 'dotenv/config';

class JWT {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  static authenticate(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new Error('Invalid header authorization', 404);
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
        if (err) {
          throw new Error('No token is provided', 401);
        }
        req.auth = response;
        next();
      });
    } catch (error) {
      next(error);
    }
  }
}
export default JWT;
