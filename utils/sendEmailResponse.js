// utils/sendEmailResponse.js
import { transporter, mailOptions } from "../utils/nodemailer";
/**
 * Send email reply to contact form submission
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} params.subject - Email subject
 * @param {string} params.replyMessage - The reply message content
 * @param {string} params.originalMessage - The original message for context
 * @param {string} params.recipientName - Name of the person receiving the reply
 * @param {string} params.adminName - Name of the admin sending the reply
 * @returns {Promise<Object>} - Success/failure response
 */
export const sendEmailResponse = async ({
  to,
  subject,
  replyMessage,
  originalMessage,
  recipientName,
  adminName = "HealthyConnect Support Team",
}) => {
  try {
    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reply from HealthyConnect</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .email-container {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e9ecef;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
          }
          .greeting {
            font-size: 18px;
            color: #495057;
            margin-bottom: 20px;
          }
          .reply-section {
            background-color: #f8f9fa;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          .original-message {
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            font-style: italic;
          }
          .original-message-label {
            font-weight: bold;
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            font-size: 14px;
            color: #6c757d;
            text-align: center;
          }
          .signature {
            margin-top: 20px;
            font-weight: 600;
            color: #2563eb;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo">HealthyConnect</div>
            <p style="margin: 0; color: #6c757d;">Healthcare Professional Network</p>
          </div>
          
          <div class="greeting">
            Hello ${recipientName},
          </div>
          
          <p>Thank you for reaching out to us. We've reviewed your message and are pleased to provide you with the following response:</p>
          
          <div class="reply-section">
            ${replyMessage
              .split("\n")
              .map(
                (paragraph) =>
                  `<p style="margin-bottom: 15px;">${paragraph}</p>`
              )
              .join("")}
          </div>
          
          <div class="original-message">
            <div class="original-message-label">Your Original Message:</div>
            <p style="margin: 0;">${originalMessage}</p>
          </div>
          
          <p>If you have any additional questions or need further assistance, please don't hesitate to contact us. We're here to help!</p>
          
          <div class="signature">
            Best regards,<br>
            ${adminName}<br>
            HealthyConnect Support Team
          </div>
          
          <div class="footer">
            <p style="margin: 5px 0;">This email was sent in response to your inquiry submitted through our contact form.</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} HealthyConnect. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create plain text version
    const textContent = `
Hello ${recipientName},

Thank you for reaching out to us. We've reviewed your message and are pleased to provide you with the following response:

${replyMessage}

Your Original Message:
${originalMessage}

If you have any additional questions or need further assistance, please don't hesitate to contact us. We're here to help!

Best regards,
${adminName}
HealthyConnect Support Team

This email was sent in response to your inquiry submitted through our contact form.
© ${new Date().getFullYear()} HealthyConnect. All rights reserved.
    `;

    // Send email
    const result = await transporter.sendMail({
      ...mailOptions,
      to: to,
      subject: `Re: ${subject}`,
      text: textContent,
      html: htmlContent,
    });

    console.log("Email reply sent successfully:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
      message: "Reply email sent successfully",
    };
  } catch (error) {
    console.error("Error sending email reply:", error);

    return {
      success: false,
      error: error.message,
      message: "Failed to send reply email",
    };
  }
};

/**
 * Send notification email to admin when a new contact message is received
 * @param {Object} params - Email parameters
 * @param {string} params.name - Name of the person who submitted the contact form
 * @param {string} params.email - Email of the person who submitted the contact form
 * @param {string} params.subject - Subject of the contact form
 * @param {string} params.message - Message content
 * @param {string} params.userType - Type of user (professional, facility, other)
 * @returns {Promise<Object>} - Success/failure response
 */
export const sendNewContactNotification = async ({
  name,
  email,
  subject,
  message,
  userType,
}) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .email-container {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #dc3545;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 10px;
            margin: 20px 0;
          }
          .info-label {
            font-weight: bold;
            color: #495057;
          }
          .message-content {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
            margin: 20px 0;
          }
          .user-type {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .professional { background-color: #e3f2fd; color: #1976d2; }
          .facility { background-color: #e8f5e8; color: #388e3c; }
          .other { background-color: #f3e5f5; color: #7b1fa2; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2 style="margin: 0;">🚨 New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0;">HealthyConnect Admin Dashboard</p>
          </div>
          
          <div class="info-grid">
            <div class="info-label">Name:</div>
            <div>${name}</div>
            
            <div class="info-label">Email:</div>
            <div>${email}</div>
            
            <div class="info-label">Subject:</div>
            <div>${subject}</div>
            
            <div class="info-label">User Type:</div>
            <div><span class="user-type ${userType}">${userType}</span></div>
            
            <div class="info-label">Submitted:</div>
            <div>${new Date().toLocaleString()}</div>
          </div>
          
          <div class="message-content">
            <h4 style="margin-top: 0; color: #2563eb;">Message:</h4>
            <p style="margin-bottom: 0;">${message}</p>
          </div>
          
          <p style="text-align: center; margin-top: 30px;">
            <strong>Please log in to your admin dashboard to respond to this message.</strong>
          </p>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      ...mailOptions,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Send to admin email
      subject: `New Contact Form Submission: ${subject}`,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: result.messageId,
      message: "Admin notification sent successfully",
    };
  } catch (error) {
    console.error("Error sending admin notification:", error);

    return {
      success: false,
      error: error.message,
      message: "Failed to send admin notification",
    };
  }
};
