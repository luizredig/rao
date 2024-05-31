import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_: any, res: any) {
  const { id } = res.params;

  const category = await prismaClient.category.delete({
    where: { id: id },
  });

  return NextResponse.json({ category });
}
