import nodemailer from "nodemailer";

export const mailOptions = {
  from: `HealthyConnect <${process.env.EMAIL_USER}>`,
};

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  sendmail: false,
  dkim: false,
});
