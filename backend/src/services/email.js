const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.BREVO_SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD
  }
});

async function sendOrderConfirmation(toEmail, { reference, amount, items = [] }) {
  const amountDisplay = (amount / 100).toFixed(2);
  const itemsHtml = items.map(it => `<li>${it.Product ? it.Product.name : 'Item'} x ${it.quantity} — ${(it.unitPrice/100).toFixed(2)}</li>`).join('');
  const html = `
    <h2>Order Confirmation</h2>
    <p>Reference: ${reference}</p>
    <p>Amount: ${amountDisplay}</p>
    <ul>${itemsHtml}</ul>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || 'no-reply@yourdomain.com',
    to: toEmail,
    subject: `Order Confirmation — ${reference}`,
    html
  });
}

module.exports = { sendOrderConfirmation };
