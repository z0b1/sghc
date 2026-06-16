import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { teamName, teamLeader, numMembers, eventName, email, phone } = await req.json();

    // Validate required fields
    if (!teamName || !teamLeader || !numMembers || !eventName || !email || !phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
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

    const recipient = process.env.QUESTIONNAIRE_RECIPIENT || "bozidar@z0b1.tech";

    const mailOptions = {
      from: `"${teamLeader}" <${process.env.SMTP_USER}>`, // sender info
      to: recipient,
      subject: `New Event Registration: ${teamName} for ${eventName}`,
      text: `Team Name: ${teamName}\nTeam Leader: ${teamLeader}\nEmail: ${email}\nPhone: ${phone}\nNumber of Members: ${numMembers}\nEvent: ${eventName}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Registration sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Event registration error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
