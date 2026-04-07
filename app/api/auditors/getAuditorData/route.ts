import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://invtrackapi.runasp.net/api/DetainedPerson";

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = await getToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const nationalNumber = req.nextUrl.searchParams.get("nationalNumber")?.trim();
  if (!nationalNumber)
    return NextResponse.json({ message: "nationalNumber مطلوب" }, { status: 400 });

  const res = await fetch(`${BASE_URL}/GetAuditorData?nationalnumber=${nationalNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok)
    return NextResponse.json({ message: "Failed to fetch" }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data);
}