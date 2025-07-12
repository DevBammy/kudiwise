import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const extractTokenFromHeader = (headers) => {
  if (headers && headers.authorization) {
    const authHeader = headers.authorization.split(' ');
    if (authHeader[0] === 'Bearer' && authHeader[1]) {
      return authHeader[1];
    }
  }
  return null;
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || extractTokenFromHeader(req.headers);

  if (!token) {
    return res.status(401).json({
      message: 'You are not authorized to access this route',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch full user from DB to get correct _id
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid token user' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Error! You are not authorized to access this route',
    });
  }
};

export default authMiddleware;
