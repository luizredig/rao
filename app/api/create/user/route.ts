import { prismaClient } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name, password, roleId } = await req.json();

  const user = await prismaClient.user.create({
    data: {
      email: email,
      name: name,
      password: password,
      roleId: roleId,
    },
  });

  return NextResponse.json({ user });
}
