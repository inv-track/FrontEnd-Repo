import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://invtrackapi.runasp.net/api/DetainedPerson";

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

// ── GET ────────────────────────────────────────────────────────────────────────
export async function GET(): Promise<NextResponse> {
  const token = await getToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BASE_URL}/GetAllAuditors`, {
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

// // ── PUT (toggle) ───────────────────────────────────────────────────────────────
// export async function PUT(req: Request): Promise<NextResponse> {
//   const token = await getToken();
//   if (!token)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const body = await req.json();

//   const res = await fetch(`${BASE_URL}/ToggleActive`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//       Accept: "*/*",
//     },
//     body: JSON.stringify({
//       nationalNumber: body.nationalNumber,
//       isActive: body.isActive,
//     }),
//   });

//   const text = await res.text();
//   if (!res.ok)
//     return NextResponse.json(
//       { message: text || "Failed to toggle" },
//       { status: res.status },
//     );

//   return NextResponse.json({ message: text });
// }
