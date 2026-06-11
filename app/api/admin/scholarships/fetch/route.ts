import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// This route acts as a webhook or cron endpoint to simulate the AI scholarship finder fetching live data
export async function POST(request: Request) {
  try {
    const { region } = await request.json(); // "Europe", "Russia", or "China"

    // Simulate AI fetching data from various university/scholarship domains based on region
    const liveAlerts = [
      {
        title: `Fully Funded Excellence Scholarship 2026 - ${region}`,
        region: region,
        universityId: 1, // Placeholder ID
        countryId: 1,    // Placeholder ID
        amount: "$20,000 / year",
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        link: "https://example.com/apply",
        description: `New live opportunity detected in ${region}. Covers full tuition and living expenses.`,
      },
      {
        title: `Research Grant for International Students - ${region}`,
        region: region,
        universityId: 1, // Placeholder ID
        countryId: 1,    // Placeholder ID
        amount: "€1,200 / month",
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        link: "https://example.com/research",
        description: `Dedicated grant for PhD and Master's students in STEM fields.`,
      }
    ];

    const createdAlerts = [];
    for (const alert of liveAlerts) {
      const newAlert = await prisma.scholarshipAlert.create({
        data: alert,
      });
      createdAlerts.push(newAlert);
    }

    // Attempt to send SMTP alert to admin if SMTP_PASS is configured
    if (process.env.SMTP_PASS && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS, // App Password
          },
        });

        const mailOptions = {
          from: `"StudyVerse AI Alerts" <${process.env.SMTP_USER}>`,
          to: "admin@studyverse.com", // Usually you send it to the admin email
          subject: `New AI Scholarship Alert for ${region}`,
          html: `
            <h2>New Scholarships Detected in ${region}</h2>
            <p>Our AI tracking system has found new scholarship opportunities:</p>
            <ul>
              ${createdAlerts.map(a => `<li><strong>${a.title}</strong> at University ID ${a.universityId} - ${a.amount}</li>`).join('')}
            </ul>
            <p>Please log in to the admin dashboard to review them.</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        
        // Mark as notified
        await prisma.scholarshipAlert.updateMany({
          where: { id: { in: createdAlerts.map(a => a.id) } },
          data: { isNotified: true }
        });
      } catch (smtpError) {
        console.error("SMTP Error sending alert:", smtpError);
        // Continue, don't fail the request just because SMTP failed
      }
    }

    return NextResponse.json({ success: true, count: createdAlerts.length, region });

  } catch (error) {
    console.error("AI Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
    return NextResponse.json({ success: false, message: "Method not allowed. Use POST to trigger AI fetch." }, { status: 405 });
}
