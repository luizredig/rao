import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: any, res: any) {
  const { id } = res.params;

  const occurrence = await prismaClient.occurrence.findUnique({
    where: { id: id },
    select: {
      anonymous: true,
      date: true,
      description: true,
      id: true,
      tags: true,
      user: {
        select: {
          name: true,
          password: true,
          role: true,
        },
      },
    },
  });

  return NextResponse.json({ occurrence });
}
