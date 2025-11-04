const express = require('express');
const axios = require('axios');
const { Order, OrderItem, Product } = require('../models');
const { sendOrderConfirmation } = require('../services/email');
const router = express.Router();
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

function genReference() {
  return 'OC-' + Date.now() + '-' + Math.floor(Math.random()*10000);
}

// Create order and initialize Paystack transaction
router.post('/init', async (req, res) => {
  const { customer, items = [], callback_url } = req.body;
  if (!customer?.email || !items.length) return res.status(400).json({ error: 'Invalid payload' });

  let total = 0;
  const orderItems = [];
  for (const it of items) {
    const p = await Product.findByPk(it.productId);
    if (!p) return res.status(400).json({ error: `Product ${it.productId} not found` });
    const qty = parseInt(it.quantity || 1, 10);
    total += p.price * qty;
    orderItems.push({ productId: p.id, quantity: qty, unitPrice: p.price });
  }

  const reference = genReference();

  const order = await Order.create({
    reference,
    amount: total,
    status: 'pending',
    metadata: { customer }
  });

  for (const oi of orderItems) {
    await OrderItem.create({ ...oi, OrderId: order.id });
  }

  try {
    const initRes = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: customer.email,
      amount: total,
      reference,
      callback_url: callback_url || `${FRONTEND_URL}/pay/callback`
    }, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    });

    const authorization_url = initRes.data.data.authorization_url;
    res.json({ authorization_url, reference, orderId: order.id });
  } catch (err) {
    console.error('Paystack init error', err?.response?.data || err.message);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

router.get('/verify/:reference', async (req, res) => {
  const { reference } = req.params;
  try {
    const verifyRes = await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    });
    const data = verifyRes.data.data;
    const order = await Order.findOne({ where: { reference } });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (data.status === 'success') {
      order.status = 'paid';
      await order.save();

      const customerEmail = order.metadata?.customer?.email;
      if (customerEmail) {
        sendOrderConfirmation(customerEmail, {
          reference,
          amount: order.amount,
          items: await order.getOrderItems({ include: [] })
        }).catch(console.error);
      }
    }
    res.json({ status: order.status, data });
  } catch (err) {
    console.error('Verify error', err?.response?.data || err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
