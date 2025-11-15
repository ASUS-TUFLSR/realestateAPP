const jwt = require('jsonwebtoken');
const prisma = require('../config/prismaClient');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: token missing' });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally verifying if admin exists
    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!admin) return res.status(401).json({ message: 'Unauthorized: admin not found' });
    req.admin = { id: admin.id, email: admin.email };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
};

module.exports = authMiddleware;
