export function getOrderInvoiceTemplate(
  name: string,
  orderId: string,
  items: Array<{ name: string; size: string; quantity: number; price: number }>,
  total: number,
) {
  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding:15px 0; border-bottom:1px solid #1A1A1A;">
        <div style="color:#FFFFFF; font-size:14px; font-weight:600; margin-bottom:4px;">${item.name}</div>
        <div style="color:#666666; font-size:12px;">${item.size}</div>
      </td>
      <td style="padding:15px 0; border-bottom:1px solid #1A1A1A; color:#999999; font-size:14px; text-align:center;">
        ×${item.quantity}
      </td>
      <td style="padding:15px 0; border-bottom:1px solid #1A1A1A; color:#D4AF37; font-size:14px; text-align:right; font-weight:600;">
        ₹${(item.price * item.quantity).toLocaleString("en-IN")}
      </td>
    </tr>
  `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Inter', Helvetica, Arial, sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#0A0A0A; border:1px solid #1A1A1A; border-radius:16px; overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:40px; text-align:center; border-bottom:1px solid #1A1A1A;">
              <div role="img" aria-label="MS Signature Scents Logo" style="font-family:'Cinzel', serif; color:#D4AF37; font-size:18px; letter-spacing:0.4em; text-transform:uppercase;">MS Signature</div>
            </td>
          </tr>
          
          <!-- Success Message -->
          <tr>
            <td style="padding:50px 40px 30px; text-align:center;">
              <div style="width:48px; height:48px; background-color:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3); border-radius:50%; margin:0 auto 20px; line-height:48px; color:#D4AF37; font-size:24px;">✔️</div>
              <h1 style="font-family:'Cinzel', serif; color:#FFFFFF; font-size:28px; font-weight:400; margin:0 0 10px;">Order Confirmed</h1>
              <p style="color:#999999; font-size:14px; margin:0;">Thank you for your patronage, ${name.split(" ")[0]}.</p>
            </td>
          </tr>
          
          <!-- Invoice Details -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#070707; border:1px solid #1A1A1A; border-radius:12px; padding:25px;">
                <tr>
                  <td style="color:#666666; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; padding-bottom:5px;">Invoice Number</td>
                  <td align="right" style="color:#666666; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; padding-bottom:5px;">Date</td>
                </tr>
                <tr>
                  <td style="color:#FFFFFF; font-size:14px; font-weight:600;">#${orderId.slice(0, 8).toUpperCase()}</td>
                  <td align="right" style="color:#FFFFFF; font-size:14px; font-weight:600;">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:20px; border-top:1px solid #1A1A1A; margin-top:20px;">
                    <span style="display:inline-block; padding:4px 12px; background-color:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.2); color:#4ADE80; font-size:10px; font-weight:700; border-radius:4px; text-transform:uppercase; letter-spacing:0.1em;">Payment Successful</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Items Table -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th align="left" style="color:#666666; font-size:11px; text-transform:uppercase; letter-spacing:0.2em; padding-bottom:15px; border-bottom:1px solid #1A1A1A;">Selection</th>
                    <th align="center" style="color:#666666; font-size:11px; text-transform:uppercase; letter-spacing:0.2em; padding-bottom:15px; border-bottom:1px solid #1A1A1A;">Qty</th>
                    <th align="right" style="color:#666666; font-size:11px; text-transform:uppercase; letter-spacing:0.2em; padding-bottom:15px; border-bottom:1px solid #1A1A1A;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding-top:30px; color:#999999; font-size:14px;">Total Amount</td>
                    <td align="right" style="padding-top:30px; color:#D4AF37; font-size:22px; font-weight:600; font-family:'Cinzel', serif;">₹${total.toLocaleString("en-IN")}</td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>
          
          <!-- Shipping Note -->
          <tr>
            <td style="padding:0 40px 50px; text-align:center;">
              <p style="color:#666666; font-size:13px; line-height:1.6; margin:0;">
                Your curated selection is being prepared for transit. You will receive a notification with tracking details once dispatched.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:40px; background-color:#070707; border-top:1px solid #1A1A1A; text-align:center;">
              <div style="color:#D4AF37; font-size:10px; text-transform:uppercase; letter-spacing:0.3em; margin-bottom:15px;">Experience the Essence</div>
              <div style="color:#444444; font-size:10px; line-height:1.8;">
                &copy; ${new Date().getFullYear()} MS Signature Scents. Mumbai, India.<br/>
                For inquiries, please reach out to <a href="mailto:contact@mssignaturescents.com" style="color:#D4AF37; text-decoration:none;">contact@mssignaturescents.com</a>
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
