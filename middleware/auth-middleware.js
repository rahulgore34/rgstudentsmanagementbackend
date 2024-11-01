const jwt = require('jsonwebtoken');
const JWT_SECRET = 'we2can3create4bigrandomstring'; // Use a secure environment variable in production

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded user data to request  
    console.log('USER  === ');
    console.log(req.user);
    
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;