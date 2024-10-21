import jwt from 'jsonwebtoken';

// Middleware to authenticate the user using JWT token
export const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
