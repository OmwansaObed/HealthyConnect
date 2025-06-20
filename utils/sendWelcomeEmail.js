import { mailOptions, transporter } from "./nodemailer";
import { welcomeTemplate } from "./templates/welcomeTemplate";

export const sendWelcomeEmail = async (to, username) => {
  try {
    await transporter.sendMail({
      ...mailOptions,
      to,
      subject: "Welcome to HealthyConnect!",
      html: welcomeTemplate(username),
    });
    console.log("Welcome email sent to", to);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};
