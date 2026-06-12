import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import type { NextRequest } from "next/server";

// Helper to save uploaded file
async function saveFile(file: File, folder: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = path.extname(file.name);
  // Using timestamp + random number to avoid external uuid dependency
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.promises.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/${folder}/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const gmail = form.get("gmail") as string | null;
    const whatsapp = form.get("whatsapp") as string | null;
    const file = form.get("paymentProof") as File | null;

    if (!gmail && !whatsapp) {
      return NextResponse.json(
        { success: false, message: "Please provide either Gmail or WhatsApp contact." },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Please upload your payment proof." },
        { status: 400 }
      );
    }

    // Save uploaded file
    const proofPath = await saveFile(file, "resume_proofs");

    // Save request in DB
    const requestRecord = await prisma.resumeRequest.create({
      data: {
        gmail: gmail || null,
        whatsapp: whatsapp || null,
        paymentProof: proofPath,
        status: "Pending"
      }
    });

    return NextResponse.json({ success: true, data: requestRecord }, { status: 201 });
  } catch (error) {
    console.error("Resume request creation error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
