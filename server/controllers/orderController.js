const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send order notification email
const sendOrderEmail = async (req, res) => {
  try {
    const { name, contactNumber, collectionTime, items, total, address } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !collectionTime || !items || !total) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order information',
      });
    }

    // Create email content
    const emailContent = generateOrderEmailContent({
      name,
      contactNumber,
      collectionTime,
      items,
      total,
      address,
    });

    // Send email
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ORDER_EMAIL || 'mahlakowamolo@gmail.com',
      subject: `[MAHLAKO SITE] New Order Inquiry - ${new Date().toLocaleString('en-ZA', { 
        timeZone: 'Africa/Johannesburg',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Order notification sent successfully',
    });

  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send order notification',
      error: error.message,
    });
  }
};

// Generate HTML email content
const generateOrderEmailContent = (orderData) => {
  const { name, contactNumber, collectionTime, items, total, address } = orderData;

  const itemsHtml = items.map(item => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left;">
        ${item.quantity} x ${item.name}
        ${item.brand ? `<br><small style="color: #6b7280;">Brand: ${item.brand}</small>` : ''}
        ${item.volume ? `<br><small style="color: #6b7280;">Volume: ${item.volume}</small>` : ''}
      </td>
      <td style="padding: 12px; text-align: right;">R${(item.specialPrice || item.price).toFixed(2)}</td>
      <td style="padding: 12px; text-align: right; font-weight: bold;">
        R${((item.specialPrice || item.price) * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order - Mahlako Wa Molo Liquor City</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .header {
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .order-info {
          background: #fef3c7;
          border-left: 4px solid #d97706;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .order-info h3 {
          margin: 0 0 15px 0;
          color: #92400e;
          font-size: 18px;
        }
        .order-info p {
          margin: 5px 0;
          font-size: 14px;
        }
        .order-info strong {
          color: #92400e;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        th {
          background: #1f2937;
          color: white;
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .total-row {
          background: #f3f4f6;
          font-weight: bold;
          font-size: 16px;
        }
        .total-row td {
          padding: 15px 12px;
          border-bottom: none;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          background: #1f2937;
          color: white;
          border-radius: 10px;
        }
        .footer p {
          margin: 5px 0;
          font-size: 14px;
        }
        .warning {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #991b1b;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🥃 NEW ORDER RECEIVED</h1>
        <p>Mahlako Wa Molo Liquor City</p>
      </div>

      <div class="content">
        <div class="order-info">
          <h3>📋 Customer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Collection Time:</strong> ${collectionTime}</p>
          <p><strong>Order Time:</strong> ${new Date().toLocaleString('en-ZA', { 
            timeZone: 'Africa/Johannesburg',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })} SAST</p>
        </div>

        <h3 style="color: #1f2937; margin: 30px 0 15px 0;">🛒 Order Items</h3>
        <table>
          <thead>
            <tr>
              <th style="width: 50%;">Item Details</th>
              <th style="width: 25%; text-align: right;">Unit Price</th>
              <th style="width: 25%; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr class="total-row">
              <td colspan="2" style="text-align: right; padding: 15px 12px;">
                <strong>ORDER TOTAL:</strong>
              </td>
              <td style="text-align: right; padding: 15px 12px; color: #d97706; font-size: 18px;">
                R${total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="order-info">
          <h3>📍 Collection Information</h3>
          <p><strong>Collection Address:</strong> ${address}</p>
          <p><strong>Trading Hours:</strong></p>
          <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
          <p>Sunday: 9:00 AM - 5:00 PM</p>
        </div>

        <div class="warning">
          <strong>⚠️ Important:</strong> This order was submitted via the website's WhatsApp ordering system. 
          The customer has been directed to send the order via WhatsApp for confirmation.
        </div>
      </div>

      <div class="footer">
        <p><strong>Mahlako Wa Molo Liquor City</strong></p>
        <p>📍 2019 Hlapo Roadway</p>
        <p>📞 +27 00 000 0000</p>
        <p>✉️ mahlakowamolo@gmail.com</p>
        <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
          Alcohol Not for Persons Under 18 | Drink Responsibly
        </p>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  sendOrderEmail,
};
