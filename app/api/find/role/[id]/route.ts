import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: any, res: any) {
  const { id } = res.params;

  const role = await prismaClient.role.findUnique({
    where: { id: id },
  });

  return NextResponse.json({ role });
}
