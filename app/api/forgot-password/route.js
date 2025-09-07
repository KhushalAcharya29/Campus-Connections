import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate if it's a college email
    if (!email.endsWith("@ratnamcollege.edu.in")) {
      return NextResponse.json({ message: "Use your college email." }, { status: 400 });
    }

    // Simulate sending email
    const resetLink = `http://localhost:3000/reset-password?email=${email}`;

    // Nodemailer Setup (Replace with actual email service)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // 🔹 Change to 465 or 2525 if needed
        secure: false, // `true` for port 465, `false` for others
        auth: {
          user: "your-email@gmail.com",
          pass: "your-app-password",
        },
      });

    await transporter.sendMail({
      from: "Campus Connections <your-email@gmail.com>",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error sending email." }, { status: 500 });
  }
}
