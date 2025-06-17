import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // app password (not normal password)
  },
});

export const mailOptions = {
  from: process.env.EMAIL_USER,
};
