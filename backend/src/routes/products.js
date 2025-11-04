const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// List products
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Get product
router.get('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

module.exports = router;
