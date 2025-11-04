const express = require('express');
const crypto = require('crypto');
const { Order } = require('../models');
const { sendOrderConfirmation } = require('../services/email');

const router = express.Router();

router.post('/paystack', express.json(), async (req, res) => {
  const sig = req.headers['x-paystack-signature'];
  const body = JSON.stringify(req.body);
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');

  if (sig !== hash) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;
  if (event.event === 'charge.success') {
    const reference = event.data.reference;
    const order = await Order.findOne({ where: { reference } });
    if (order) {
      order.status = 'paid';
      await order.save();

      const customerEmail = order.metadata?.customer?.email;
      if (customerEmail) {
        sendOrderConfirmation(customerEmail, { reference, amount: order.amount, items: [] }).catch(console.error);
      }
    }
  }

  res.json({ received: true });
});

module.exports = router;
