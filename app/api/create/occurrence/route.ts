import { prismaClient } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    anonymous,
    categoryId,
    classificationId,
    date,
    description,
    locationId,
    participantsIds,
    statusId,
    tagsIds,
    userId,
  } = await req.json();

  const occurrence = await prismaClient.occurrence.create({
    data: {
      anonymous: anonymous,
      categoryId: categoryId,
      classificationId: classificationId,
      date: date,
      description: description,
      locationId: locationId,
      participantsIds: [...participantsIds],
      statusId: statusId,
      tags: {
        connect: tagsIds.map((id: string) => ({ id: id })),
      },
      userId: userId,
    },
  });

  return NextResponse.json({ occurrence });
}
