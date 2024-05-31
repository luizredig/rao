import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_: any, res: any) {
  const { id } = res.params;

  const user = await prismaClient.user.delete({
    where: { id: id },
  });

  return NextResponse.json({ user });
}
