const prisma = require('../config/prismaClient');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
require('dotenv').config();

async function ensureAdminExists() {
  // Create initial admin if not present (for dev)
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.admin.create({ data: { email, password: hashed } });
    console.log('Initial admin user created from .env');
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(admin);
  res.json({ token, admin: { id: admin.id, email: admin.email } });
}

module.exports = { login, ensureAdminExists };
