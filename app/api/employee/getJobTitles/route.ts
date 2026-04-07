import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://invtrackapi.runasp.net/api/Employee";

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

// ── GET /api/employee/getJobTitles ────────────────────────────────────────────
export async function GET(): Promise<NextResponse> {
  const token = await getToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BASE_URL}/GetAllJobTitels`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok)
    return NextResponse.json(
      { message: "Failed to fetch" },
      { status: res.status },
    );

  const data = await res.json();
  return NextResponse.json(data);
}
