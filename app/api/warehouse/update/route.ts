import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface UpdateAssetRequest {
  quantity: number;
  name: string;
  status: string;
  price: number;
  serialNumber: string;
  assetType: string;
  location: string;
  category: string;
  unit: string;
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: UpdateAssetRequest = await req.json();

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/AssetItem/UpdateAssetItem",
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "فشل التعديل" }, { status: response.status });
    }

    return NextResponse.json({ message: "تم التعديل" }, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}