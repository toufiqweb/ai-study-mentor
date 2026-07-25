import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const contactEmail = process.env.CONTACT_EMAIL || smtpUser;

if (!smtpUser || !smtpPass) {
  console.warn("SMTP credentials (SMTP_USER, SMTP_PASS) are not configured in environment variables.");
}

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for 587
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

interface SendEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail({ name, email, subject, message }: SendEmailParams) {
  if (!smtpUser || !smtpPass) {
    throw new Error("Email service is not configured on the server.");
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  // 1. Admin Email Notification (Sent to site admin/developer)
  const adminMailOptions = {
    from: `"AI Study Mentor Contact" <${smtpUser}>`,
    to: contactEmail,
    replyTo: email,
    subject: `📩 New Contact: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 30px 15px; color: #334155; }
            .wrapper { max-width: 600px; margin: 0 auto; }
            .card { background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2); }
            .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); padding: 36px 32px; text-align: left; }
            .brand-badge { display: inline-block; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.2); color: #c7d2fe; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; }
            .header-title { color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; line-height: 1.2; letter-spacing: -0.5px; }
            .header-sub { color: #a5b4fc; font-size: 14px; margin-top: 6px; margin-bottom: 0; }
            .content { padding: 32px; }
            .field-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 18px; margin-bottom: 16px; }
            .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 4px; }
            .field-value { font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word; }
            .message-container { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #6366f1; border-radius: 14px; padding: 20px; margin-top: 8px; margin-bottom: 24px; }
            .message-text { font-size: 15px; line-height: 1.7; color: #334155; whitespace: pre-wrap; margin: 0; }
            .btn-action { display: inline-block; background: #4f46e5; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 12px; }
            .footer { padding: 24px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <div class="brand-badge">AI STUDY MENTOR &bull; CONTACT FORM</div>
                <h1 class="header-title">New Visitor Inquiry</h1>
                <p class="header-sub">Received on ${formattedDate}</p>
              </div>
              <div class="content">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                  <tr>
                    <td width="50%" style="padding-right: 8px;">
                      <div class="field-box" style="margin-bottom: 0;">
                        <div class="field-label">Sender Name</div>
                        <div class="field-value">${escapeHtml(name)}</div>
                      </div>
                    </td>
                    <td width="50%" style="padding-left: 8px;">
                      <div class="field-box" style="margin-bottom: 0;">
                        <div class="field-label">Sender Email</div>
                        <div class="field-value"><a href="mailto:${escapeHtml(email)}" style="color: #4f46e5; text-decoration: none;">${escapeHtml(email)}</a></div>
                      </div>
                    </td>
                  </tr>
                </table>

                <div class="field-box">
                  <div class="field-label">Subject</div>
                  <div class="field-value">${escapeHtml(subject)}</div>
                </div>

                <div class="field-label" style="margin-left: 4px; margin-bottom: 6px;">Message</div>
                <div class="message-container">
                  <p class="message-text">${escapeHtml(message)}</p>
                </div>

                <div style="text-align: right;">
                  <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(subject)}" class="btn-action">
                    Reply to ${escapeHtml(name)} &rarr;
                  </a>
                </div>
              </div>
              <div class="footer">
                Sent via AI Study Mentor Contact Portal &bull; ${new Date().getFullYear()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // 2. User Confirmation Auto-Reply Email (Sent directly to the user who filled out the form)
  const userAckMailOptions = {
    from: `"AI Study Mentor" <${smtpUser}>`,
    to: email,
    replyTo: contactEmail,
    subject: `We received your email - AI Study Mentor`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>We Received Your Email</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 30px 15px; color: #334155; }
            .wrapper { max-width: 600px; margin: 0 auto; }
            .card { background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 36px 32px; text-align: left; }
            .brand-badge { display: inline-block; background: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; }
            .header-title { color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; line-height: 1.2; }
            .content { padding: 32px; font-size: 15px; line-height: 1.7; color: #334155; }
            .status-badge { display: inline-flex; items-center: center; background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px; }
            .highlight-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; margin: 20px 0; }
            .footer { padding: 24px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <div class="brand-badge">AI STUDY MENTOR</div>
                <h1 class="header-title">We Received Your Email! 📩</h1>
              </div>
              <div class="content">
                <div class="status-badge">
                  ✓ Message Successfully Received
                </div>

                <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #0f172a;">Hi ${escapeHtml(name)},</p>
                <p>Thank you for reaching out to <strong>AI Study Mentor</strong>. We have received your message regarding <strong>"${escapeHtml(subject)}"</strong>.</p>
                
                <p style="color: #4f46e5; font-weight: 600; font-size: 16px;">
                  Very soon we will review your details and update you!
                </p>

                <div class="highlight-box">
                  <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 6px;">Your Message Details</div>
                  <div style="font-size: 14px; color: #1e293b; font-style: italic; line-height: 1.6;">"${escapeHtml(message.length > 200 ? message.substring(0, 200) + "..." : message)}"</div>
                </div>

                <p>Our team is currently reviewing your inquiry. If you have any additional details to add, feel free to reply directly to this email.</p>
                
                <p style="margin-bottom: 0;">Best regards,<br><strong style="color: #0f172a;">AI Study Mentor Support Team</strong></p>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} AI Study Mentor. All rights reserved.<br>
                This is an automated confirmation email. Replies go directly to support.
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Send admin notification
  await transporter.sendMail(adminMailOptions);

  // Send auto-acknowledgement reply directly to the user who emailed us
  try {
    await transporter.sendMail(userAckMailOptions);
    console.log(`Auto-reply email sent successfully to ${email}`);
  } catch (err) {
    console.error(`Failed to send auto-reply email to ${email}:`, err);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
