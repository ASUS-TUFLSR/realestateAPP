// seedAdmin.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const plain = process.env.ADMIN_PASSWORD;
  if (!email || !plain) {
    console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    process.exit(1);
  }
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  const hashed = await bcrypt.hash(plain, 10);
  await prisma.admin.create({ data: { email, password: hashed } });
  console.log('Admin created:', email);
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
