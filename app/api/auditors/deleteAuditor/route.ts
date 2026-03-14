import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://invtrackapi.runasp.net/api/DetainedPerson";

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

// ── DELETE /api/auditors/deleteAuditor?nationalNumber=xxx ─────────────────────
export async function DELETE(req: Request): Promise<NextResponse> {
  const token = await getToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const nationalNumber = searchParams.get("nationalNumber");

  if (!nationalNumber)
    return NextResponse.json(
      { message: "nationalNumber is required" },
      { status: 400 },
    );

  const res = await fetch(
    `${BASE_URL}/DeleteAuditor?nationalNumber=${nationalNumber}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    },
  );

  const text = await res.text();
  if (!res.ok)
    return NextResponse.json(
      { message: text || "Failed to delete" },
      { status: res.status },
    );

  return NextResponse.json({ message: text });
}
