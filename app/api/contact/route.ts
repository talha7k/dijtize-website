// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);
    const { name, email, message, to, recaptchaToken } = body;

    if (!name || !email || !message || !to || !recaptchaToken) {
      console.log("Missing fields:", {
        name,
        email,
        message,
        to,
        recaptchaToken,
      });
      return NextResponse.json(
        { message: "All fields, including reCAPTCHA, are required" },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      },
    );
    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      console.log("reCAPTCHA verification failed:", recaptchaResult);
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are not configured");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // e.g., support@dijitize.com
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP connection verified");

    const mailOptions = {
      from: `"Dijitize Support" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: to,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error in API route:", error.message, error.stack);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 },
    );
  }
}
