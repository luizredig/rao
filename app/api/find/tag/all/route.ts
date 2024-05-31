import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tags = await prismaClient.tag.findMany();
  return NextResponse.json({ tags });
}
