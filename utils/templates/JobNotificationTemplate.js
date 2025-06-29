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
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Opportunity</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .job-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .job-title { color: #667eea; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .job-details { margin: 15px 0; }
        .job-details strong { color: #555; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .highlight { background: #e8f2ff; padding: 10px; border-left: 4px solid #667eea; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 New Job Match Found!</h1>
            <p>A job opportunity matching your profession is available</p>
        </div>
        
        <div class="content">
            <p>Hi <strong>${username}</strong>,</p>
            
            <p>Great news! We found a new job opportunity that matches your professional background:</p>
            
            <div class="job-card">
                <div class="job-title">${jobTitle}</div>
                
                <div class="job-details">
                    <p><strong>Company:</strong> ${companyName}</p>
                    <p><strong>Location:</strong> ${
                      jobLocation.state
                        ? `${jobLocation.county}, ${jobLocation.state}`
                        : jobLocation.county || "Location not specified"
                    }</p>
                    ${
                      jobSalary &&
                      `<p><strong>Salary:</strong> To be communicated</p>`
                    }
                    ${type ? `<p><strong>Job Type:</strong> ${type}</p>` : ""}
                </div>
                
                ${
                  jobDescription
                    ? `
                <div class="highlight">
                    <strong>Job Description:</strong>
                    <p>${jobDescription.substring(0, 250)}${
                        jobDescription.length > 250 ? "..." : ""
                      }</p>
                </div>
                `
                    : ""
                }
                
                <a href="https://healthyconnect.vercel.app/job" class="cta-button">
                    View Full Job Details
                </a>
            </div>
            
            <p>Don't miss out on this opportunity! Apply now to secure your position.</p>
            
            <p>Best regards,<br>
            <strong>HealthyConnect Team</strong></p>
        </div>
        
        <div class="footer">
            <p>You're receiving this because you've set your profession preferences on HealthyConnect.</p>
            <p><a href="${
              process.env.NEXTAUTH_URL
            }/profile/settings">Update your preferences</a></p>
        </div>
    </div>
</body>
</html>
`;
