export function getMagicLinkTemplate(actionLink: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 600px) {
      .inner-padding { padding: 30px 20px !important; }
      .title { font-size: 28px !important; }
    }
    .hover-btn:hover { background-color: #F5D98A !important; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(212,175,55,0.2) !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Inter', Helvetica, Arial, sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#0A0A0A;border:1px solid #1A1A1A;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.4);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 50px 40px 30px;">
              <div role="img" aria-label="MS Signature Scents Logo" style="font-family:'Cinzel', serif; color:#D4AF37; font-size:20px; letter-spacing:0.5em; text-transform:uppercase; margin-bottom:10px;">MS Signature</div>
              <div role="presentation" style="height:1px; width:40px; background-color:#D4AF37; margin: 20px auto;"></div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="inner-padding" style="padding: 0 60px 50px; text-align:center;">
              <h1 class="title" style="font-family:'Cinzel', serif; color:#FFFFFF; font-size:32px; font-weight:400; margin:0 0 20px; letter-spacing:0.02em;">A Golden Invitation</h1>
              <p style="color:#999999; font-size:15px; line-height:1.8; margin:0 0 40px; font-weight:300;">
                Step back into the world of timeless fragrances. Your secure gateway to MS Signature Scents is ready.
              </p>
              
              <!-- Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="border-radius:8px; background-color:#D4AF37;">
                    <a href="${actionLink}" class="hover-btn" style="display:inline-block; padding:20px 45px; font-family:'Cinzel', serif; font-size:14px; font-weight:700; color:#0A0A0A; text-decoration:none; text-transform:uppercase; letter-spacing:0.2em; transition: all 0.3s ease;">
                      Enter the Gallery
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color:#666666; font-size:12px; margin-top:50px; line-height:1.6;">
                The link is valid for 15 minutes.<br/>
                If you did not request this, you may safely disregard this message.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:40px; background-color:#070707; border-top:1px solid #1A1A1A; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#555555; font-size:11px; text-transform:uppercase; letter-spacing:0.2em;">
                    Pure &bull; Long-lasting &bull; Timeless
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px; color:#444444; font-size:10px; line-height:1.5;">
                    &copy; ${new Date().getFullYear()} MS Signature Scents. Mumbai, India.<br/>
                    Crafting the art of fine attar.
                  </td>
                </tr>
              </table>
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

