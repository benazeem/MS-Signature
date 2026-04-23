import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

let transporter: nodemailer.Transporter | null = null;

export async function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.NODEMAILER_HOST;
  const port = process.env.NODEMAILER_PORT;
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("Missing credentials for Nodemailer");
  }

  try {
    const options: SMTPTransport.Options = {
      host: host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: {
        user,
        pass,
      },
    };

    transporter = nodemailer.createTransport(options);
    return transporter;
  } catch (error) {
    console.error("Failed to create email transporter:", error);
    throw new Error("Email system configuration error");
  }
}

export const EMAIL_FROM = (
  process.env.EMAIL_FROM || "hello@demomailtrap.com"
).trim();

export const ADMIN_EMAIL = process.env.WEBSITE_EMAIL;
