import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const locations = await prismaClient.location.findMany();
  return NextResponse.json({ locations });
}
