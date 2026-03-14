import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://invtrackapi.runasp.net/api/DetainedPerson";

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

// ── POST /api/auditors/updateAuditor ─────────────────────────────────────────
export async function POST(req: Request): Promise<NextResponse> {
  const token = await getToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const res = await fetch(`${BASE_URL}/UpdateAuditor`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify({
      name: body.name,
      oldNationalNumber: body.oldNationalNumber,
      newNationalNumber: body.newNationalNumber,
    }),
  });

  const text = await res.text();
  if (!res.ok)
    return NextResponse.json(
      { message: text || "Failed to update" },
      { status: res.status },
    );

  return NextResponse.json({ message: text });
}
