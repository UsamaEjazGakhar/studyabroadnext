import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { z } from "zod";

const prisma = new PrismaClient();

const consultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  program: z.string().min(1, "Program is required"),
  country: z.string().min(1, "Country is required"),
  education: z.string().min(1, "Education level is required"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = consultationSchema.parse(body);

    // Save to Database
    const lead = await prisma.consultationLead.create({
      data: validatedData,
    });

    // Attempt to send email (if SMTP is configured in .env)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // Send alert to admin
        subject: `New Consultation Request from ${validatedData.name}`,
        text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
Program: ${validatedData.program}
Country: ${validatedData.country}
Education: ${validatedData.education}
Message: ${validatedData.message || "N/A"}
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Consultation API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
