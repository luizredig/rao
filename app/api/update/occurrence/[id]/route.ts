import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { statusId, classificationId } = body;

  const occurrence = await prismaClient.occurrence.findUnique({
    where: { id: params.id },
  });

  await prismaClient.occurrence.update({
    where: { id: params.id },
    data: {
      statusId,
      classificationId,
    },
  });

  return NextResponse.json({ occurrence, status: 200 });
}
