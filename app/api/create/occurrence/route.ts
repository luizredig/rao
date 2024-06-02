import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();

  const occurrence = await prismaClient.occurrence.create({
    data: {
      anonymous: data.anonymous,
      categoryId: data.categoryId,
      classificationId: data.classificationId,
      date: data.date,
      description: data.description,
      locationId: data.locationId,
      participantsIds: [...data.participantsIds],
      statusId: data.statusId,
      tags: {
        connect: data.tagsIds.map((id: string) => ({ id: id })),
      },
      userId: data.userId,
    },
  });

  return NextResponse.json({ status: 200 });
}
