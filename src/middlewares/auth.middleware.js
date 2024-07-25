import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const bearerToken = req.headers['authorization'];
  const token = bearerToken.replace("Bearer ","");

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};
