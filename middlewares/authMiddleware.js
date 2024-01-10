const CustomError = require('../errors/customError');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No token found', 400);
  }

  try {
    const token = authHeader.split(' ')[1];

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    next();
  } catch (error) {
    throw new CustomError('Invalid token', 401);
  }
};

const authPermission = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new CustomError('Unauthorized to access this route', 403);
  }
  next();
};

module.exports = { authMiddleware, authPermission };
