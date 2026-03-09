# Contact Form Email Integration — Design

**Date:** 2026-03-09
**Status:** Approved

## Goal

When a user submits the contact form, send a formatted notification email to `info@jacobbrewhouse.com` (hosted on Hostinger) via ZeptoMail, with `reply-to` set to the customer's email so the owner can reply directly from their inbox.

## Architecture

```
User fills form → POST /api/contact → ZeptoMail API → info@jacobbrewhouse.com (Hostinger)
                                                        ↳ reply-to: customer's email
```

## Files

| File | Action | Purpose |
|------|--------|---------|
| `src/app/api/contact/route.ts` | Create | API route: validate input, send email via ZeptoMail SDK |
| `src/app/contact/page.tsx` | Modify | Wire handleSubmit to POST /api/contact, add loading/success/error states |
| `.env.local` | Create | Store ZEPTOMAIL_TOKEN secret |

## Data Flow

1. Frontend validates required fields (name, email, message) client-side
2. POST JSON to `/api/contact`
3. API route validates server-side, calls ZeptoMail SDK:
   - From: `noreply@jacobbrewhouse.com` (configured sender in ZeptoMail)
   - To: `info@jacobbrewhouse.com`
   - Reply-To: customer's email
   - Subject: `[Contact Form] {subject} — from {name}`
   - Body: Clean HTML with all form fields
4. Returns `{ success: true }` or `{ error: "..." }`
5. Frontend shows success message or error

## Email Body

Clean, minimal HTML notification with all form fields (name, email, phone, subject, message).

## Security

- Server-side input validation (max lengths, email format)
- API key in `.env.local`, never exposed to client
- No CSRF needed (same-origin API route)
- ZeptoMail handles its own rate limits

## Dependencies

- `zeptomail` npm package (official Zoho SDK)

## Frontend UX

- Button shows "Sending..." with disabled state during submission
- On success: form clears, green success message
- On error: red error message, form data preserved for retry
