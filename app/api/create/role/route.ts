import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { name } = await req.json();

  const lowercased = name.toLowerCase();

  const slug = lowercased.replace(/\s+/g, "-");

  const role = await prismaClient.role.create({
    data: {
      name: name,
      slug: slug,
    },
  });

  return NextResponse.json({ status: 200 });
}
