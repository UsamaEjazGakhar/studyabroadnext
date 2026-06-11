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
    const categoryIdStr = form.get('categoryId') as string;
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
      // Save uploaded files with fallback placeholders
      let profilePath = "/uploads/profile_pics/placeholder.png";
      let proofPath = "/uploads/payment_proofs/placeholder.png";
      try {
        profilePath = await saveFile(profilePic, "profile_pics");
        proofPath = await saveFile(paymentProof, "payment_proofs");
      } catch (fileErr) {
        console.error("File upload error:", fileErr);
        // Continue with placeholder paths so registration can still succeed
      }

    // Create user with Pending status and initial payment record
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashed,
        status: "Pending",
        profilePicture: profilePath,
        role: { connectOrCreate: { where: { name: "User" }, create: { name: "User" } } },
        // store selected scholarship category if provided
        // Connect selected scholarship category if provided
        ...(categoryIdStr
          ? {
              category: {
                connect: { id: parseInt(categoryIdStr, 10) },
              },
            }
          : {}),
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

    // Optional email notification – if SMTP is not configured or fails, registration will still succeed.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    try {
      await transporter.sendMail({
        from: "no-reply@studyabroad.com",
        to: email,
        subject: "Registration Received - Pending Approval",
        text: `Hello ${firstName},\n\nYour registration is pending admin approval. We will notify you once it is reviewed.`,
      });
    } catch (mailErr) {
      console.error("Email send error (non‑blocking):", mailErr);
      // Continue without aborting registration.
    }

    return NextResponse.json({ success: true, message: "Registration submitted", userId: user.id }, { status: 201 });
    } catch (err) {
      console.error("Registration error:", err);
      return NextResponse.json({ success: false, message: err instanceof Error ? err.message : "Server error" }, { status: 500 });
    }
}

