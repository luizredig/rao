import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: any, res: any) {
  const { id } = res.params;

  const user = await prismaClient.user.findUnique({
    where: { id: id },
  });

  return NextResponse.json({ user });
}
