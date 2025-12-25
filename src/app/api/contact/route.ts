import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  /*
    PLACEHOLDER:
    - EmailJS
    - Resend
    - Nodemailer
  */

  console.log("CONTACT FORM:", data);

  return NextResponse.json({ success: true });
}
