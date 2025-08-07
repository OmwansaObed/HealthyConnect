export const welcomeTemplate = (username) => `
<div style="
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  color: #333333;
">
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 16px 0;
      color: #0070f3;
      letter-spacing: -0.5px;
    ">
      Welcome to HealthyConnect!
    </h1>
    <p style="
      font-size: 18px;
      color: #666666;
      margin: 0;
      font-weight: 600;
    ">
      Hi ${
        username.username || "there"
      }, we're excited to have you join our community 🎉
    </p>
  </div>

  <!-- Main Content -->
  <div style="
    background-color: #f8fafc;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 32px;
    border: 1px solid #e2e8f0;
  ">
    <h2 style="
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #1a202c;
    ">
      Get Started in Minutes
    </h2>
    <p style="
      font-size: 16px;
      color: #4a5568;
      margin: 0 0 24px 0;
    ">
      Your account is ready! Click the button below to explore opportunities and start connecting with healthcare professionals.
    </p>
    
    <!-- CTA Button -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://healthyconnect.co.ke/jobs" style="
        display: inline-block;
        background: linear-gradient(135deg, #0070f3 0%, #0051cc 100%);
        color: #ffffff;
        padding: 14px 32px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
        transition: all 0.3s ease;
      ">
        Get Started Now
      </a>
    </div>
  </div>

  <!-- What's Next Section -->
  <div style="margin-bottom: 32px;">
    <h3 style="
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #1a202c;
    ">
      What's next?
    </h3>
    <ul style="
      list-style: none;
      padding: 0;
      margin: 0;
      color: #4a5568;
    ">
      <li style="
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        font-size: 15px;
      ">
        <span style="
          color: #0070f3;
          font-weight: 600;
          margin-right: 8px;
          min-width: 20px;
        ">✓</span>
        Complete your profile to get personalized job recommendations
      </li>
      <li style="
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        font-size: 15px;
      ">
        <span style="
          color: #0070f3;
          font-weight: 600;
          margin-right: 8px;
          min-width: 20px;
        ">✓</span>
        Browse healthcare opportunities in your area
      </li>
      <li style="
        display: flex;
        align-items: flex-start;
        font-size: 15px;
      ">
        <span style="
          color: #0070f3;
          font-weight: 600;
          margin-right: 8px;
          min-width: 20px;
        ">✓</span>
        Connect with healthcare professionals and employers
      </li>
    </ul>
  </div>

  <!-- Support Section -->
  <div style="
    border-top: 1px solid #e2e8f0;
    padding-top: 24px;
    margin-bottom: 24px;
  ">
    <p style="
      font-size: 14px;
      color: #718096;
      margin: 0 0 8px 0;
    ">
      Need help getting started? We're here for you!
    </p>
    <p style="
      font-size: 14px;
      color: #718096;
      margin: 0;
    ">
      Contact us at <a href="mailto:healthyconnect010@gmail.com" style="color: #0070f3; text-decoration: none;">healthyconnect010@gmail.com</a> or visit our <a href="https://healthyconnect.co.ke/help-center" style="color: #0070f3; text-decoration: none;">Help Center</a>
    </p>
  </div>

  <!-- Footer -->
  <div style="
    border-top: 1px solid #e2e8f0;
    padding-top: 24px;
    text-align: center;
  ">
    <p style="
      font-size: 12px;
      color: #a0aec0;
      margin: 0 0 8px 0;
    ">
      If you didn't create this account, you can safely ignore this email.
    </p>
    <p style="
      font-size: 12px;
      color: #a0aec0;
      margin: 0;
      font-weight: 500;
    ">
      The HealthyConnect Team
    </p>
  </div>
</div>
`;
