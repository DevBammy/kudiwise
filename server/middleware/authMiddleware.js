import jwt from 'jsonwebtoken';

// Function to extract token from headers if not found in cookies
const extractTokenFromHeader = (headers) => {
  if (headers && headers.authorization) {
    const authHeader = headers.authorization.split(' ');
    if (authHeader[0] === 'Bearer' && authHeader[1]) {
      return authHeader[1];
    }
  }
  return null;
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || extractTokenFromHeader(req.headers);

  if (!token) {
    return res.status(401).json({
      message: 'You are not authorized to access this route',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'Error! You are not authorized to access this route',
      });
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;
