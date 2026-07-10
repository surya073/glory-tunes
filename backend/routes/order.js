const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/order", async (req, res) => {
  const { name, email, phone, service, notes } = req.body;

  if (!name || !email || !service) {
    return res.status(400).json({ success: false, message: "Name, email and service are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Notify you
    await transporter.sendMail({
      from: `"Glory Tunes" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `New Order – ${name} | ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0c97f; border-radius: 8px; padding: 24px; background: #fffdf5;">
          <h2 style="color: #b8860b;">🎵 Glory Tunes – New Order Request</h2>
          <hr style="border-color: #e0c97f;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone / WhatsApp:</strong> ${phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <hr style="border-color: #e0c97f;" />
          <p><strong>Notes:</strong></p>
          <p style="background:#fff8e1; padding:12px; border-left:4px solid #e0c97f; border-radius:4px; white-space:pre-wrap;">${notes || "None"}</p>
          <hr style="border-color: #e0c97f;" />
          <p style="font-size:12px; color:#999;">Sent from the Glory Tunes order modal.</p>
        </div>
      `,
    });

    // Auto-reply to customer
    await transporter.sendMail({
      from: `"Glory Tunes" <${process.env.EMAIL}>`,
      to: email,
      subject: `We've received your order, ${name}! 🎵`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0c97f; border-radius: 8px; padding: 24px; background: #fffdf5;">
          <h2 style="color: #b8860b;">Thank you, ${name}! 🎶</h2>
          <p>We've received your order for <strong>${service}</strong> and will get back to you within <strong>24 hours</strong>.</p>
          <ul>
            <li><strong>Service:</strong> ${service}</li>
            <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
          </ul>
          <p style="color:#b8860b; font-style:italic;">"The best gift is one that no one else will ever own."</p>
          <p>– The Glory Tunes Team</p>
        </div>
      `,
    });

    res.json({ success: true, message: "Order email sent successfully." });
  } catch (error) {
    console.error("Order mailer error:", error);
    res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
  }
});

module.exports = router;