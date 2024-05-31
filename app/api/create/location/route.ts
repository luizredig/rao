import { prismaClient } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description } = await req.json();

  const user = await prismaClient.location.create({
    data: {
      description: description,
    },
  });

  return NextResponse.json({ user });
}
