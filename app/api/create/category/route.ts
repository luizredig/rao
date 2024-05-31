import { prismaClient } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, slug } = await req.json();

  const category = await prismaClient.category.create({
    data: {
      name: name,
      slug: slug,
    },
  });

  return NextResponse.json({ category });
}
