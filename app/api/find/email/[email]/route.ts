import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { email: string } },
) {
  const user = await prismaClient.user.findUnique({
    where: { email: params.email },
    select: {
      password: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: 404,
      message: "Usuário não encontrado.",
    });
  }

  return NextResponse.json({ status: 200, user });
}
