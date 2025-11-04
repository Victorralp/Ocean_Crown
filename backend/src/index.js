require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./models');
const productsRouter = require('./routes/products');
const checkoutRouter = require('./routes/checkout');
const webhookRouter = require('./routes/webhook');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize DB (creates tables for dev)
initDb();

app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/webhook', webhookRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
