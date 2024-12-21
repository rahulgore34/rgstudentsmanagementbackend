const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Use a secure environment variable in production

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(req.header);
  
  if (!token) return res.status(401).json({ message: 'Access denied.Please provide auth token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;