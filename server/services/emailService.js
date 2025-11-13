import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendBookingConfirmation = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: "Hair by Deeh - Booking Confirmed! 💇‍♀️",
    html: `
      <h2>Your booking has been confirmed!</h2>
      <p>Hi ${booking.name},</p>
      <p>Thank you for booking with Hair by Deeh. Your appointment details are below:</p>
      <ul>
        <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
        <li><strong>Deposit Paid:</strong> $${booking.deposit}</li>
        <li><strong>Status:</strong> CONFIRMED</li>
      </ul>
      <p style="color: #ff5fa2; font-weight: bold;">⚠️ Important: Your deposit of $${booking.deposit} is non-refundable. Please ensure you can attend your appointment.</p>
      <p>If you have any questions, feel free to contact us!</p>
      <p>Best regards,<br/>Hair by Deeh Team</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

export const sendBookingApprovalNotification = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || "admin@hairbydeeh.com",
    subject: `New Booking Request: ${booking.name}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Deposit:</strong> $${booking.deposit}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
