/**
 * Helper to escape HTML characters in user input to prevent XSS in email templates.
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const baseStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f4f6f9;
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
  }
  .wrapper {
    width: 100%;
    background-color: #f4f6f9;
    padding: 40px 0;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }
  .header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    padding: 32px 36px;
    text-align: left;
  }
  .header-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    color: #38bdf8;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
  }
  .header h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.5px;
  }
  .body {
    padding: 36px;
  }
  .greeting {
    font-size: 16px;
    color: #334155;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  .table-box {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  .table-box th, .table-box td {
    padding: 14px 18px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #e2e8f0;
  }
  .table-box th {
    background-color: #f8fafc;
    color: #64748b;
    font-weight: 600;
    width: 35%;
  }
  .table-box td {
    background-color: #ffffff;
    color: #0f172a;
    font-weight: 500;
  }
  .table-box tr:last-child th, .table-box tr:last-child td {
    border-bottom: none;
  }
  .message-block {
    background-color: #f8fafc;
    border-left: 4px solid #0ea5e9;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
    font-size: 14px;
    line-height: 1.6;
    color: #334155;
    white-space: pre-wrap;
  }
  .footer {
    background-color: #f8fafc;
    padding: 24px 36px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    font-size: 13px;
    color: #64748b;
  }
  .footer p {
    margin: 4px 0;
  }
`;

/**
 * 1. Contact Form - Internal Team Notification Template
 */
export function renderContactNotificationEmail({ name, email, phone, company, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeCompany = escapeHtml(company || "Not provided");
  const safeMessage = escapeHtml(message);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <span class="header-badge">Internal Notification</span>
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="body">
            <p class="greeting">You have received a new contact inquiry through the website. Here are the details:</p>
            <table class="table-box">
              <tr>
                <th>Full Name</th>
                <td>${safeName}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${safeEmail}" style="color:#0ea5e9; text-decoration:none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <th>Company</th>
                <td>${safeCompany}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>${safePhone}</td>
              </tr>
            </table>
            
            <div style="font-weight: 600; font-size: 14px; color: #475569; margin-top: 20px;">Message:</div>
            <div class="message-block">${safeMessage}</div>
          </div>
          <div class="footer">
            <p><strong>System Notification</strong> &bull; Contact Management</p>
            <p>Sent from your website contact form routing.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 2. Contact Form - User Auto-Reply Template
 */
export function renderContactAutoReplyEmail({ name, message }) {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <span class="header-badge">Confirmation</span>
            <h1>We Received Your Message</h1>
          </div>
          <div class="body">
            <p class="greeting">Dear ${safeName},</p>
            <p class="greeting">Thank you for reaching out to us! We have successfully received your inquiry and our team is reviewing it. We will get back to you as soon as possible.</p>
            
            <div style="font-weight: 600; font-size: 14px; color: #475569; margin-top: 24px;">Summary of your submission:</div>
            <div class="message-block">${safeMessage}</div>
            
            <p class="greeting" style="margin-top: 24px;">If you have any urgent follow-ups, please feel free to reply directly to this email.</p>
          </div>
          <div class="footer">
            <p><strong>Thank you for connecting with us!</strong></p>
            <p>This is an automated confirmation email from contact@company.com.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 3. POC Request Form - Internal Team Notification Template
 */
export function renderPocNotificationEmail({ fullName, email, company, industry, message }) {
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeIndustry = escapeHtml(industry || "Not specified");
  const safeMessage = escapeHtml(message || "No additional details provided.");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New POC Request</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <span class="header-badge">Sales Lead</span>
            <h1>New POC Request</h1>
          </div>
          <div class="body">
            <p class="greeting">A new Proof of Concept (POC) request has been submitted. Details below:</p>
            <table class="table-box">
              <tr>
                <th>Full Name</th>
                <td>${safeName}</td>
              </tr>
              <tr>
                <th>Work Email</th>
                <td><a href="mailto:${safeEmail}" style="color:#0ea5e9; text-decoration:none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <th>Company</th>
                <td>${safeCompany}</td>
              </tr>
              <tr>
                <th>Industry</th>
                <td>${safeIndustry}</td>
              </tr>
            </table>

            <div style="font-weight: 600; font-size: 14px; color: #475569; margin-top: 20px;">Project Details / Message:</div>
            <div class="message-block">${safeMessage}</div>
          </div>
          <div class="footer">
            <p><strong>Sales Notification</strong> &bull; POC Request Handler</p>
            <p>Sent from your website POC request form routing.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 4. POC Request Form - User Auto-Reply Template
 */
export function renderPocAutoReplyEmail({ fullName, company }) {
  const safeName = escapeHtml(fullName);
  const safeCompany = escapeHtml(company);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>POC Request Received</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <span class="header-badge">Confirmation</span>
            <h1>Proof of Concept Request Received</h1>
          </div>
          <div class="body">
            <p class="greeting">Dear ${safeName},</p>
            <p class="greeting">Thank you for your interest in our solutions for <strong>${safeCompany}</strong>! We have received your Proof of Concept (POC) request.</p>
            <p class="greeting">A member of our technical sales team will review your requirements and get in touch with you shortly to schedule an initial consultation and demo.</p>
            
            <p class="greeting" style="margin-top: 24px;">If you have any immediate questions, feel free to reply directly to this email.</p>
          </div>
          <div class="footer">
            <p><strong>Sales & Solutions Team</strong></p>
            <p>This is an automated confirmation email from sales@company.com.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 5. Job Application - Internal HR Notification Template
 */
export function renderJobNotificationEmail({ firstName, lastName, email, phone, roleTitle, resumeFileName, resumeUrl }) {
  const safeName = escapeHtml(`${firstName} ${lastName}`);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeRole = escapeHtml(roleTitle);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Application</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <span class="header-badge">HR & Careers</span>
            <h1>New Job Application</h1>
          </div>
          <div class="body">
            <p class="greeting">A new candidate has submitted an application for the position of <strong>${safeRole}</strong>.</p>
            <table class="table-box">
              <tr>
                <th>Applicant Name</th>
                <td>${safeName}</td>
              </tr>
              <tr>
                <th>Applied Role</th>
                <td>${safeRole}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${safeEmail}" style="color:#0ea5e9; text-decoration:none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>${safePhone}</td>
              </tr>
       
            </table>
          </div>
          <div class="footer">
            <p><strong>HR Notification</strong> &bull; Careers Portal</p>
            <p>Sent from your website Job Application form routing.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 6. Job Application - Candidate Auto-Reply Template
 */
export function renderJobAutoReplyEmail({ firstName, lastName, roleTitle }) {
  const safeName = escapeHtml(`${firstName} ${lastName}`);
  const safeRole = escapeHtml(roleTitle);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <span class="header-badge">Confirmation</span>
            <h1>Application Received</h1>
          </div>
          <div class="body">
            <p class="greeting">Dear ${safeName},</p>
            <p class="greeting">Thank you for applying for the <strong>${safeRole}</strong> position at our company!</p>
            <p class="greeting">We have received your application and resume. Our recruitment team will review your qualifications, and if your background matches what we're looking for, we will contact you for the next steps.</p>
            
            <p class="greeting" style="margin-top: 24px;">We appreciate your interest in joining our team and wish you the best of luck!</p>
          </div>
          <div class="footer">
            <p><strong>Human Resources Team</strong></p>
            <p>This is an automated confirmation email from hr@company.com.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
