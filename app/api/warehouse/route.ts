import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Asset {
  name: string;
  status: string;
  price: number;
  serialNumber: string;
  assetType: string;
  location: string;
  category: string;
  unit: string;
  quantity: number;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serialNumber = searchParams.get("serialNumber");

    const apiUrl = serialNumber
      ? `http://invtrackapi.runasp.net/api/AssetItem/GetAssetByCode?code=${serialNumber}`
      : `http://invtrackapi.runasp.net/api/AssetItem/GetAllAssets`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    const data: Asset | Asset[] = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache",
      },
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}