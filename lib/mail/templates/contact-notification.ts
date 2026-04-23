export function getContactNotificationTemplate(name: string, email: string, subject: string, message: string) {
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; padding: 20px !important; }
      .content { padding: 30px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#030303;font-family:'Plus Jakarta Sans', sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#030303; padding: 60px 0;">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background-color:#080808; border:1px solid #1a1a1a; border-radius:24px; overflow:hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.8);">
          <!-- Visual Accent Bar -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #8E6E2E 0%, #D4AF37 50%, #8E6E2E 100%);"></td>
          </tr>
          
          <!-- Header -->
          <tr>
            <td style="padding:50px 50px 30px; text-align:center;">
              <div style="font-family:'Cinzel', serif; color:#D4AF37; font-size:12px; font-weight:700; letter-spacing:0.6em; text-transform:uppercase; margin-bottom:15px; opacity:0.8;">Concierge Notification</div>
              <h1 style="font-family:'Cinzel', serif; color:#FFFFFF; font-size:28px; font-weight:400; margin:0; letter-spacing:0.1em; line-height:1.2;">New Client Inquiry</h1>
            </td>
          </tr>
          
          <!-- Inquiry Card -->
          <tr>
            <td class="content" style="padding:0 50px 50px;">
              <div style="background-color:#0c0c0c; border:1px solid #1a1a1a; border-radius:16px; padding:35px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:25px; border-bottom:1px solid #1a1a1a;">
                      <div style="color:#666666; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; margin-bottom:10px;">Client Information</div>
                      <div style="color:#FFFFFF; font-size:18px; font-weight:600; margin-bottom:4px;">${name}</div>
                      <a href="mailto:${email}" style="color:#D4AF37; font-size:14px; text-decoration:none; border-bottom:1px solid rgba(212,175,55,0.2);">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:25px 0; border-bottom:1px solid #1a1a1a;">
                      <div style="color:#666666; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; margin-bottom:10px;">Subject Line</div>
                      <div style="color:#FFFFFF; font-size:16px; font-weight:500; line-height:1.4;">${subject}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:25px;">
                      <div style="color:#666666; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; margin-bottom:15px;">Inquiry Message</div>
                      <div style="color:#cccccc; font-size:15px; line-height:1.8; white-space:pre-wrap; background-color:#050505; padding:20px; border-radius:12px; border:1px solid #151515;">${message}</div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Action Area -->
              <div style="text-align:center; margin-top:40px;">
                <a href="mailto:${email}" style="display:inline-block; padding:20px 45px; background: linear-gradient(135deg, #D4AF37 0%, #8E6E2E 100%); color:#000000; text-decoration:none; font-family:'Cinzel', serif; font-size:13px; font-weight:700; border-radius:100px; text-transform:uppercase; letter-spacing:0.2em; box-shadow: 0 10px 30px rgba(212,175,55,0.3);">Respond to Client</a>
                <div style="margin-top:20px; color:#444444; font-size:11px; text-transform:uppercase; letter-spacing:0.1em;">
                  Received on ${date}
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:40px; background-color:#050505; border-top:1px solid #1a1a1a; text-align:center;">
              <div style="font-family:'Cinzel', serif; color:#D4AF37; font-size:14px; letter-spacing:0.4em; margin-bottom:15px;">MS Signature Scents</div>
              <div style="color:#333333; font-size:10px; line-height:1.8; text-transform:uppercase; letter-spacing:0.2em; max-width:400px; margin:0 auto;">
                This is an automated priority notification for the administrative team.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

