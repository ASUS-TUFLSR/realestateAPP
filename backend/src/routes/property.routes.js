const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/authMiddleware');
const propertyController = require('../controllers/property.controller');

// Public
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

// Admin protected (multipart)
router.post(
  '/',
  auth,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]),
  propertyController.createProperty
);

router.put(
  '/:id',
  auth,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]),
  propertyController.updateProperty
);

router.delete('/:id', auth, propertyController.deleteProperty);

module.exports = router;
