import { NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function validateForm(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length === 0) return "Name is required";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Valid email is required";
  if (!data.message || data.message.trim().length === 0) return "Message is required";
  if (data.name.length > 200) return "Name is too long";
  if (data.email.length > 200) return "Email is too long";
  if (data.phone && data.phone.length > 20) return "Phone number is too long";
  if (data.subject && data.subject.length > 200) return "Subject is too long";
  if (data.message.length > 5000) return "Message is too long";
  return null;
}

function buildEmailHtml(data: ContactFormData): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 8px;">
      <h2 style="color: #1B5E3B; margin: 0 0 24px 0; font-size: 22px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 100px; vertical-align: top; font-size: 14px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-size: 14px;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; vertical-align: top; font-size: 14px;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-size: 14px;">${escapeHtml(data.email)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; vertical-align: top; font-size: 14px;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-size: 14px;">${data.phone ? escapeHtml(data.phone) : "—"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; vertical-align: top; font-size: 14px;">Subject</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-size: 14px;">${escapeHtml(data.subject)}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding: 20px; background: #fff; border-radius: 6px; border: 1px solid #eee;">
        <p style="margin: 0 0 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
        <p style="margin: 0; color: #111; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
      <p style="margin: 24px 0 0 0; color: #999; font-size: 12px;">Sent from the Jacob's Brew House contact form</p>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    const validationError = validateForm(data);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const token = process.env.ZEPTOMAIL_TOKEN;
    if (!token) {
      console.error("ZEPTOMAIL_TOKEN is not configured");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const client = new SendMailClient({
      url: "api.zeptomail.com/",
      token,
    });

    await client.sendMail({
      from: {
        address: process.env.ZEPTOMAIL_FROM_EMAIL || "noreply@jacobbrewhouse.com",
        name: process.env.ZEPTOMAIL_FROM_NAME || "Jacob's Brew House",
      },
      to: [
        {
          email_address: {
            address: process.env.ZEPTOMAIL_TO_EMAIL || "info@jacobbrewhouse.com",
            name: "Jacob's Brew House",
          },
        },
      ],
      reply_to: [
        {
          address: data.email,
          name: data.name,
        },
      ],
      subject: `[Contact Form] ${data.subject.replace(/[\r\n]/g, "")} — from ${data.name.replace(/[\r\n]/g, "")}`,
      htmlbody: buildEmailHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
