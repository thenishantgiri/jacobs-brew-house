# Contact Form Email Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire the contact form to send notification emails to `info@jacobbrewhouse.com` via ZeptoMail, with reply-to set to the customer's email.

**Architecture:** Next.js API route (`/api/contact`) receives form POST, validates input server-side, sends email via ZeptoMail SDK, returns JSON response. Frontend handles loading/success/error states.

**Tech Stack:** Next.js 16 App Router, ZeptoMail Node.js SDK, TypeScript

**Design doc:** `docs/plans/2026-03-09-contact-form-email-design.md`

---

### Task 1: Install ZeptoMail SDK

**Step 1: Install the package**

Run: `npm install zeptomail`

**Step 2: Verify installation**

Run: `grep zeptomail package.json`
Expected: `"zeptomail": "^X.X.X"` appears in dependencies

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add zeptomail SDK dependency"
```

---

### Task 2: Create environment config

**Files:**
- Create: `.env.local`
- Modify: `.gitignore` (verify `.env*.local` is already ignored)

**Step 1: Verify .env.local is gitignored**

Run: `grep "env.local" .gitignore`
Expected: `.env*.local` or `.env.local` is listed (Next.js default .gitignore includes this)

**Step 2: Create `.env.local`**

```env
ZEPTOMAIL_TOKEN=your_zeptomail_api_token_here
ZEPTOMAIL_FROM_EMAIL=noreply@jacobbrewhouse.com
ZEPTOMAIL_FROM_NAME=Jacob's Brew House
ZEPTOMAIL_TO_EMAIL=info@jacobbrewhouse.com
```

> **Note to implementer:** The user must replace `your_zeptomail_api_token_here` with their actual ZeptoMail Send Mail Token. The `ZEPTOMAIL_FROM_EMAIL` must be a verified sender address in ZeptoMail (domain must be verified in the ZeptoMail dashboard). Do NOT commit this file.

**Step 3: No commit** (`.env.local` is gitignored)

---

### Task 3: Create the API route

**Files:**
- Create: `src/app/api/contact/route.ts`

**Step 1: Create the API route file**

```typescript
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
      subject: `[Contact Form] ${data.subject} — from ${data.name}`,
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
```

**Step 2: Verify it compiles**

Run: `npx next build`
Expected: Build succeeds with no TypeScript errors

**Step 3: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add /api/contact route with ZeptoMail integration"
```

---

### Task 4: Update contact form frontend

**Files:**
- Modify: `src/app/contact/page.tsx:53-65` (state & handleSubmit)
- Modify: `src/app/contact/page.tsx:140-168` (form JSX)

**Step 1: Add status state and update handleSubmit**

Replace lines 53–65 of `src/app/contact/page.tsx` — the component's state and handleSubmit:

```typescript
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "General Inquiry", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    }
  };
```

**Step 2: Add status feedback UI and update the submit button**

Replace the submit button (line 165-167) and add feedback messages. The form section (`<form>` tag area, lines 140-168) becomes:

```tsx
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-sm uppercase tracking-wide text-white/50 font-sans">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    className="bg-transparent border-b border-white/20 focus:border-brand-green text-white py-4 outline-none transition-colors duration-300 font-sans disabled:opacity-50"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wide text-white/50 font-sans">Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange} disabled={status === "sending"} className="bg-transparent border-b border-white/20 focus:border-brand-green text-white py-4 outline-none transition-colors duration-300 font-sans appearance-none cursor-pointer disabled:opacity-50">
                  {["General Inquiry", "Reservation", "Private Event", "Feedback", "Other"].map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0A0A0A] text-white">{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wide text-white/50 font-sans">Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} disabled={status === "sending"} className="bg-transparent border-b border-white/20 focus:border-brand-green text-white py-4 outline-none transition-colors duration-300 font-sans resize-none disabled:opacity-50" />
              </div>

              {status === "success" && (
                <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg px-5 py-4">
                  <p className="text-brand-green-light font-sans text-sm">Thank you! Your message has been sent. We&rsquo;ll get back to you soon.</p>
                </div>
              )}

              {status === "error" && errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-5 py-4">
                  <p className="text-red-400 font-sans text-sm">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-brand-green text-white py-4 rounded-lg font-sans text-sm uppercase tracking-[0.2em] hover:bg-brand-green/80 transition-colors duration-300 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
```

**Step 3: Verify build**

Run: `npx next build`
Expected: Build succeeds

**Step 4: Manual test**

1. Run: `npm run dev`
2. Open `http://localhost:3000/contact`
3. Fill the form with test data, submit
4. Without a valid ZeptoMail token, expect a 500 error response — verify the error message appears in the UI
5. With a valid token in `.env.local`, verify the email arrives at `info@jacobbrewhouse.com`

**Step 5: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: wire contact form to /api/contact with loading/success/error states"
```

---

### Task 5: Final verification & user setup

**Step 1: Verify full build**

Run: `npx next build`
Expected: All routes compile, including new `/api/contact`

**Step 2: Prompt user for ZeptoMail setup**

The user needs to:
1. Log in to ZeptoMail dashboard
2. Verify the domain `jacobbrewhouse.com` (if not already done)
3. Create a Mail Agent and get the Send Mail Token
4. Paste the token into `.env.local` as `ZEPTOMAIL_TOKEN`
5. Set `ZEPTOMAIL_FROM_EMAIL` to a verified sender address (e.g., `noreply@jacobbrewhouse.com`)

**Step 3: End-to-end test with real token**

1. Update `.env.local` with the real token
2. Run `npm run dev`
3. Submit the contact form
4. Verify email arrives in the Hostinger mailbox at `info@jacobbrewhouse.com`
5. Verify "Reply" in the mailbox auto-populates the customer's email

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete contact form email integration via ZeptoMail"
```
