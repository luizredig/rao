import { prismaClient } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, slug } = await req.json();

  const tag = await prismaClient.tag.create({
    data: {
      name: name,
      slug: slug,
    },
  });

  return NextResponse.json({ tag });
}
