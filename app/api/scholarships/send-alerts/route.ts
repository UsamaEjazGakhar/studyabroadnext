import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../../../../utils/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Get all pending alerts
    const pendingAlerts = await prisma.scholarshipAlert.findMany({
      where: { isNotified: false },
    });

    if (pendingAlerts.length === 0) {
      return NextResponse.json(
        { message: "No pending alerts to send." },
        { status: 200 }
      );
    }

    // 2. Get all active email subscribers
    const subscribers = await prisma.emailSubscriber.findMany();

    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: "No subscribers found." },
        { status: 200 }
      );
    }

    // 3. Format email content
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #0f172a;">New Study Abroad Scholarships Available!</h2>
        <p>We found ${pendingAlerts.length} new scholarship opportunities matching our regions.</p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

        ${pendingAlerts
        .map((alert: any) => `
            <div style="margin-bottom: 20px; padding: 15px; border-left: 4px solid #3b82f6; background: #f8fafc;">
              <h3 style="margin: 0 0 10px 0; color: #1e293b;">
                ${alert.title}
              </h3>

              <p style="margin: 0 0 5px 0;">
                <strong>Region:</strong> ${alert.region}
              </p>

              ${alert.university
            ? `<p style="margin: 0 0 5px 0;"><strong>University:</strong> ${alert.university}</p>`
            : ""
          }

              ${alert.amount
            ? `<p style="margin: 0 0 5px 0;"><strong>Amount:</strong> ${alert.amount}</p>`
            : ""
          }

              ${alert.deadline
            ? `<p style="margin: 0 0 5px 0;"><strong>Deadline:</strong> ${new Date(
              alert.deadline
            ).toLocaleDateString()}</p>`
            : ""
          }

              <p style="margin: 10px 0 0 0;">
                <a
                  href="${alert.link || "#"}"
                  style="color: #3b82f6; text-decoration: none; font-weight: bold;"
                >
                  View Details →
                </a>
              </p>
            </div>
          `)
        .join("")}

        <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
          You are receiving this email because you subscribed to HMS Study Abroad scholarship alerts.
        </p>
      </div>
    `;

    // 4. Prepare BCC list
    const bccList = subscribers
      .map((s: any) => s.email)
      .join(",");

    // 5. Send email
    await sendEmail({
      to: process.env.SMTP_FROM_EMAIL || "hms769472@gmail.com",
      subject: `🎓 ${pendingAlerts.length} New Scholarships Found!`,
      html: htmlContent,
      // @ts-ignore
      bcc: bccList,
    });

    // 6. Mark alerts as notified
    await prisma.scholarshipAlert.updateMany({
      where: {
        id: {
          in: pendingAlerts.map((a: any) => a.id),
        },
      },
      data: {
        isNotified: true,
      },
    });

    return NextResponse.json(
      {
        message: "Emails sent successfully",
        sentCount: pendingAlerts.length,
        subscriberCount: subscribers.length,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error sending scholarship alerts:", error);

    return NextResponse.json(
      {
        message: "Failed to send alerts",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}