import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}