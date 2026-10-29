import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { name, email, message, company } = await req.json();

  // Honeypot: real users never fill the hidden "company" field
  if (company) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    // Fail loudly so the visitor is told to email directly instead of seeing a fake "Sent"
    console.warn("Contact form: RESEND_API_KEY / CONTACT_TO_EMAIL not set. Message:", { name, email, message });
    return NextResponse.json({ error: "Email not configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(key);
    // Resend returns API failures (bad key, unverified recipient) as `error` instead of throwing
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
