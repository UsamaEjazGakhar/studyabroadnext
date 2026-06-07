import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // use shared prisma instance
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

// Helper to save uploaded file (multipart/form-data handling)
async function saveFile(file: File, folder: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = path.extname(file.name);
  const filename = `${uuidv4()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.promises.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.promises.writeFile(filePath, buffer);
  // Return relative path for DB storage
  return `/uploads/${folder}/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const firstName = form.get("firstName") as string;
    const lastName = form.get("lastName") as string;
    const profilePic = form.get("profilePic") as File;
    const paymentProof = form.get("paymentProof") as File;

    if (!email || !password || !firstName || !lastName || !profilePic || !paymentProof) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Check duplicate email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const profilePath = await saveFile(profilePic, "profile_pics");
    const proofPath = await saveFile(paymentProof, "payment_proofs");

    // Create user with Pending status and initial payment record
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashed,
        status: "Pending",
        profilePicture: profilePath,
        role: { connect: { name: "User" } },
        payments: {
          create: {
            month: new Date(), // current month start
            amount: 0, // placeholder, admin can adjust later
            proofPath,
            status: "Pending",
          },
        },
      },
    });

    // Send pending registration email (using environment SMTP config)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: "no-reply@studyabroad.com",
      to: email,
      subject: "Registration Received - Pending Approval",
      text: `Hello ${firstName},\n\nYour registration is pending admin approval. We will notify you once it is reviewed.`,
    });

    return NextResponse.json({ success: true, message: "Registration submitted", userId: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

