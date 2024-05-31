import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  return Response.json({ message: "OK", params });
}
