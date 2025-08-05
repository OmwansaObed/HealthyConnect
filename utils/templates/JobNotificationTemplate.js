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
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        
        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 24px 16px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 40px 32px;
            text-align: center;
            position: relative;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 32px;
        }
        
        .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #1e293b;
        }
        
        .intro-text {
            font-size: 16px;
            margin-bottom: 32px;
            color: #64748b;
            line-height: 1.7;
        }
        
        .job-card {
            background: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            margin: 32px 0;
            position: relative;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .job-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 2px 0 0 2px;
        }
        
        .job-title {
            color: #1e293b;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 1.3;
            letter-spacing: -0.025em;
        }
        
        .job-meta {
            display: grid;
            gap: 16px;
            margin-bottom: 24px;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 15px;
            color: #475569;
        }
        
        .meta-icon {
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            flex-shrink: 0;
        }
        
        .meta-label {
            font-weight: 600;
            color: #374151;
            min-width: 70px;
        }
        
        .salary-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 10px 16px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            margin: 16px 0 24px 0;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .job-details {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 24px;
            border-radius: 12px;
            margin: 24px 0;
        }
        
        .job-details-title {
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .job-description {
            color: #64748b;
            line-height: 1.7;
            font-size: 15px;
        }
        
        .cta-section {
            text-align: center;
            margin: 32px 0;
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
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
            letter-spacing: -0.025em;
        }
        
        .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.4);
        }
        
        .secondary-cta {
            margin-top: 16px;
        }
        
        .secondary-link {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            transition: color 0.2s ease;
        }
        
        .secondary-link:hover {
            color: #7c3aed;
        }
        
        .closing {
            margin: 32px 0;
            color: #64748b;
            font-size: 15px;
            line-height: 1.7;
        }
        
        .signature {
            font-weight: 600;
            color: #374151;
            margin-top: 20px;
        }
        
        .footer {
            background: #f8fafc;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
        }
        
        .footer-link {
            color: #4f46e5;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .footer-link:hover {
            color: #7c3aed;
            text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 640px) {
            .email-wrapper {
                padding: 16px 8px;
            }
            
            .container {
                border-radius: 12px;
            }
            
            .header {
                padding: 32px 24px;
            }
            
            .logo {
                font-size: 24px;
            }
            
            .header-subtitle {
                font-size: 14px;
            }
            
            .content {
                padding: 32px 24px;
            }
            
            .job-card {
                padding: 24px;
            }
            
            .job-title {
                font-size: 20px;
                margin-bottom: 20px;
            }
            
            .job-meta {
                gap: 12px;
            }
            
            .meta-item {
                font-size: 14px;
            }
            
            .job-details {
                padding: 20px;
            }
            
            .footer {
                padding: 24px;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 12px;
            }
            
            .cta-button {
                padding: 14px 28px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="container">
            <div class="header">
                <div class="logo">🩺 HealthyConnect</div>
                <div class="header-subtitle">Your perfect job match is here!</div>
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
                            <span class="meta-label">Facility:</span>
                            <span>${companyName}</span>
                        </div>
                        
                        <div class="meta-item">
                            <div class="meta-icon">📍</div>
                            <span class="meta-label">Location:</span>
                            <span>${
                              jobLocation.state
                                ? `${jobLocation.county}, ${jobLocation.state}`
                                : jobLocation.county || "Location not specified"
                            }</span>
                        </div>
                        
                        <div class="meta-item">
                            <div class="meta-icon">⏰</div>
                            <span class="meta-label">Type:</span>
                            <span>${
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
                    }/settings" class="footer-link">
                        Update Preferences
                    </a>
                    <a href="${
                      process.env.NEXTAUTH_URL
                    }/notifications" class="footer-link">
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
