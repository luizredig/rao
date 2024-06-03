import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const roles = await prismaClient.role.findMany();
  return NextResponse.json({ roles });
}
