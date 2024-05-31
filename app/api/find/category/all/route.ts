import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prismaClient.category.findMany();
  return NextResponse.json({ categories });
}
