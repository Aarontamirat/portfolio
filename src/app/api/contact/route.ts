import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    // check if phone is valid
    if (phone && !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // if phone is left blank, set a phoneNumber Constant to Not Provided
    if (!phone) {
      const phoneNumber = "Not Provided!";
    }

    // check if email is valid
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: GMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: message,
      html: `
        <html lang="en" className="scroll-smooth">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            p {
              @apply text-gray-800;
              @apply leading-relaxed;
              @apply text-lg md:text-xl;
              @apply font-semibold;
            }
            .email {
              @apply text-blue-500;
              @apply hover:underline;
            }
          </style>
        </head>
        <body>
          <p>Hi,</p>
          <p>My name is <span className="font-semibold">${name}</span></p>
          <p>My Email is <a className="email" href="mailto:${email}">${email}</a></p>
          ${
            phone == ""
              ? ""
              : `<p>My Phone number is <span className="font-semibold">${phone}</span></p>`
          }
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
