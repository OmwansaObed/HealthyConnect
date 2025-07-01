export const jobNotificationTemplate = (
  username,
  jobTitle,
  jobDescription,
  jobLocation,
  companyName,
  jobSalary,
  type
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Opportunity - HealthyConnect</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background-color: #f7fafc;
        }
        
        .email-wrapper {
            width: 100%;
            background-color: #f7fafc;
            padding: 20px 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.15"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }
        
        .header-content {
            position: relative;
            z-index: 1;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #1a202c;
        }
        
        .intro-text {
            font-size: 16px;
            margin-bottom: 30px;
            color: #4a5568;
        }
        
        .job-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
        }
        
        .job-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }
        
        .job-title {
            color: #1a202c;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        
        .job-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #4a5568;
        }
        
        .meta-icon {
            width: 16px;
            height: 16px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: bold;
        }
        
        .job-details {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            border: 1px solid #e2e8f0;
        }
        
        .job-details-title {
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .job-description {
            color: #4a5568;
            line-height: 1.6;
        }
        
        ${
          jobSalary
            ? `
        .salary-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin: 10px 0;
        }
        `
            : ""
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0 30px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
        }
        
        .secondary-cta {
            margin-top: 15px;
        }
        
        .secondary-link {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
        }
        
        .closing {
            margin: 30px 0;
            color: #4a5568;
        }
        
        .signature {
            font-weight: 600;
            color: #2d3748;
            margin-top: 10px;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            font-size: 14px;
            color: #718096;
            margin-bottom: 15px;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .footer-link {
            color: #4f46e5;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        
        .footer-link:hover {
            text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 600px) {
            .email-wrapper {
                padding: 10px;
            }
            
            .container {
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .job-card {
                padding: 20px;
            }
            
            .job-title {
                font-size: 20px;
            }
            
            .job-meta {
                flex-direction: column;
                gap: 10px;
            }
            
            .footer {
                padding: 20px;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="container">
            <div class="header">
                <div class="header-content">
                    <div class="logo">🩺 HealthyConnect</div>
                    <div class="header-subtitle">Your perfect job match is here!</div>
                </div>
            </div>
            
            <div class="content">
                <div class="greeting">Hi ${username}! 👋</div>
                
                <div class="intro-text">
                    Exciting news! We've found a new job opportunity that perfectly matches your healthcare expertise and career preferences.
                </div>
                
                <div class="job-card">
                    <h2 class="job-title">${jobTitle}</h2>
                    
                    <div class="job-meta">
                        <div class="meta-item">
                            <div class="meta-icon">🏥</div>
                            <span><strong>Facility:</strong> ${companyName}</span>
                        </div>
                        
                        <div class="meta-item">
                            <div class="meta-icon">📍</div>
                            <span><strong>Location:</strong> ${
                              jobLocation.state
                                ? `${jobLocation.county}, ${jobLocation.state}`
                                : jobLocation.county || "Location not specified"
                            }</span>
                        </div>
                        
                        <div class="meta-item">
                            <div class="meta-icon">⏰</div>
                            <span><strong>Type:</strong> ${
                              type.charAt(0).toUpperCase() + type.slice(1)
                            }</span>
                        </div>
                    </div>
                    
                    ${
                      jobSalary
                        ? `<div class="salary-badge">💰 ${jobSalary}</div>`
                        : ""
                    }
                    
                    ${
                      jobDescription
                        ? `
                    <div class="job-details">
                        <div class="job-details-title">Job Overview</div>
                        <div class="job-description">
                            ${jobDescription.substring(0, 300)}${
                            jobDescription.length > 300 ? "..." : ""
                          }
                        </div>
                    </div>
                    `
                        : ""
                    }
                    
                    <div class="cta-section">
                        <a href="https://healthyconnect.vercel.app/job" class="cta-button">
                            View Full Details & Apply
                        </a>
                        <div class="secondary-cta">
                            <a href="https://healthyconnect.vercel.app/jobs" class="secondary-link">
                                Browse all available positions →
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="closing">
                    This opportunity matches your professional background and preferences. Don't let it slip away – quality healthcare positions like this are in high demand!
                    
                    <div class="signature">
                        Best regards,<br>
                        <strong>The HealthyConnect Team</strong>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-text">
                    You're receiving this because you've enabled job notifications for your profession on HealthyConnect.
                </div>
                <div class="footer-links">
                    <a href="${
                      process.env.NEXTAUTH_URL
                    }/profile/settings" class="footer-link">
                        Update Preferences
                    </a>
                    <a href="${
                      process.env.NEXTAUTH_URL
                    }/profile/notifications" class="footer-link">
                        Notification Settings
                    </a>
                    <a href="${
                      process.env.NEXTAUTH_URL
                    }/unsubscribe" class="footer-link">
                        Unsubscribe
                    </a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
