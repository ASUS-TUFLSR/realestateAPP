const prisma = require('../config/prismaClient');
const { uploadToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');

async function createProperty(req, res) {
  try {
    const { title, builderName, location, price, description } = req.body;
    // files from multer: mainImage, gallery (array)
    let mainImageUrl = '';
    const galleryUrls = [];

    // main image
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      const path = req.files.mainImage[0].path;
      mainImageUrl = await uploadToCloudinary(path, 'realestate/main');
      // cleanup local file
      fs.unlinkSync(path);
    }

    // gallery images (multiple)
    if (req.files && req.files.gallery) {
      for (const f of req.files.gallery) {
        const url = await uploadToCloudinary(f.path, 'realestate/gallery');
        galleryUrls.push(url);
        fs.unlinkSync(f.path);
      }
    }

    const created = await prisma.property.create({
      data: {
        title,
        builderName,
        location,
        price: parseInt(price || 0),
        mainImage: mainImageUrl || '',
        gallery: galleryUrls,
        description: description || ''
      }
    });

    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function getAllProperties(req, res) {
  try {
    const { location, minPrice, maxPrice, title } = req.query;
    const filters = {};
    const AND = [];

    if (location) AND.push({ location: { contains: location, mode: 'insensitive' } });
    if (title) AND.push({ title: { contains: title, mode: 'insensitive' } });

    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.gte = parseInt(minPrice);
      if (maxPrice) priceFilter.lte = parseInt(maxPrice);
      AND.push({ price: priceFilter });
    }

    if (AND.length) filters.where = { AND };

    const properties = await prisma.property.findMany(filters);
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function getPropertyById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const prop = await prisma.property.findUnique({ where: { id } });
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function updateProperty(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { title, builderName, location, price, description } = req.body;
    const data = {
      title,
      builderName,
      location,
      price: price ? parseInt(price) : undefined,
      description
    };

    // Processing images if provided (overwrite mainImage or append gallery)
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      const path = req.files.mainImage[0].path;
      const url = await uploadToCloudinary(path, 'realestate/main');
      data.mainImage = url;
      fs.unlinkSync(path);
    }

    if (req.files && req.files.gallery) {
      // uploading new ones and append to existing gallery
      const galleryUrls = [];
      for (const f of req.files.gallery) {
        const url = await uploadToCloudinary(f.path, 'realestate/gallery');
        galleryUrls.push(url);
        fs.unlinkSync(f.path);
      }
      // fetching existing then concat
      const existing = await prisma.property.findUnique({ where: { id } });
      data.gallery = [...(existing.gallery || []), ...galleryUrls];
    }

    const updated = await prisma.property.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function deleteProperty(req, res) {
  try {
    const id = parseInt(req.params.id);
    await prisma.property.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
