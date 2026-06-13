import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      title: string;
      region: string;
      universityId?: number;
      countryId?: number;
      amount?: number;
      deadline?: string;
      link?: string;
      description?: string;
    };
    const { title, region, universityId, countryId, amount, deadline, link, description } = body;
    const alert = await prisma.scholarshipAlert.create({
      data: {
        title,
        region,
        universityId: body.universityId,
        countryId: body.countryId,
        amount: (amount ?? null) as any,
        deadline: deadline ? new Date(deadline) : null,
        link: link ?? null,
        description: description ?? null,
      } as any,
    });
    return new Response(JSON.stringify(alert), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating scholarship alert:", error);
    return new Response(JSON.stringify({ error: "Failed to create scholarship alert" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const region = url.searchParams.get("region");
  const whereClause: any = {};
  if (region && region !== "All") {
    whereClause.region = { equals: region };
  }
  const alerts = await prisma.scholarshipAlert.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(alerts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
