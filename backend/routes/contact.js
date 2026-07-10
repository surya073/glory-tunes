const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", async (req, res) => {
  const { name, email, phone, occasion, genre, message } = req.body;

  if (!name || !email || !message || !occasion) {
    return res.status(400).json({
      success: false,
      message: "Name, email, occasion and message are required.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Glory Tunes" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `New Song Request – ${name} | ${occasion}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0c97f; border-radius: 8px; padding: 24px; background: #fffdf5;">
          <h2 style="color: #b8860b; margin-bottom: 4px;">🎵 Glory Tunes – New Song Request</h2>
          <hr style="border-color: #e0c97f; margin-bottom: 20px;" />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone / WhatsApp:</strong> ${phone || "Not provided"}</p>
          <p><strong>Occasion:</strong> ${occasion}</p>
          <p><strong>Preferred Genre:</strong> ${genre || "Not specified"}</p>

          <hr style="border-color: #e0c97f; margin: 20px 0;" />

          <p><strong>Story / Message:</strong></p>
          <p style="background: #fff8e1; padding: 12px; border-left: 4px solid #e0c97f; border-radius: 4px; white-space: pre-wrap;">${message}</p>

          <hr style="border-color: #e0c97f; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This email was sent from the Glory Tunes contact form.</p>
        </div>
      `,
    });

    // Auto-reply to the customer
    await transporter.sendMail({
      from: `"Glory Tunes" <${process.env.EMAIL}>`,
      to: email,
      subject: `We've received your request, ${name}! 🎵`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0c97f; border-radius: 8px; padding: 24px; background: #fffdf5;">
          <h2 style="color: #b8860b;">Thank you, ${name}! 🎶</h2>
          <p>We've received your song request and our team will get back to you within <strong>24 hours</strong> with a personalised quote.</p>
          <p><strong>Your request summary:</strong></p>
          <ul>
            <li><strong>Occasion:</strong> ${occasion}</li>
            <li><strong>Genre:</strong> ${genre || "Not specified"}</li>
          </ul>
          <p>In the meantime, feel free to reach us on WhatsApp if you have any questions.</p>
          <p style="color: #b8860b; font-style: italic;">"The best gift is one that no one else will ever own."</p>
          <p>– The Glory Tunes Team</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "Mail sent successfully.",
    });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

module.exports = router;