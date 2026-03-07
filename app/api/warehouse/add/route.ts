import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface AssetRequest {
  name: string;
  status: string;
  price: number;
  serialNumber: string;
  assetType: string;
  room: string;
  category: string;
  unit: string;
  quantity?: number;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: AssetRequest = await req.json();

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/AssetItem/AddAsset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "فشل إضافة العهدة" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "تمت الإضافة بنجاح" },
      { status: 200 }
    );

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}