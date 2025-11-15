require('dotenv').config();
const express = require('express');
const cors = require('cors');
const adminRoutes = require('./src/routes/admin.routes');
const propertyRoutes = require('./src/routes/property.routes');
const { ensureAdminExists } = require('./src/controllers/admin.controller');

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => res.send({ message: 'Realestate API is running' }));
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);

// ensure admin exists (creates from .env if provided)
ensureAdminExists().catch(err => console.error('Admin init error', err));

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
