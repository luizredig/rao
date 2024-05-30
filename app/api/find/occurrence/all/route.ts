import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const occurrences = await prismaClient.occurrence.findMany();
  return NextResponse.json({ occurrences });
}
