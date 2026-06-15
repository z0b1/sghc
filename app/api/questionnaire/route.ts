// app/api/questionnaire/route.ts
import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ status: "questionnaire API alive" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, studentClass, studentYear, interests } = await req.json();
    // Validate required fields
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, // sender info
      to: process.env.QUESTIONNAIRE_RECIPIENT,
      subject: `New Hack Club Membership Questionnaire from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nClass: ${studentClass || "N/A"}\nYear: ${studentYear || "N/A"}\nInterests: ${interests || "N/A"}`,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Questionnaire submission error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
