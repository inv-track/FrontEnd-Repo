import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serialNumber = searchParams.get("serialNumber");

    if (!serialNumber) {
      return NextResponse.json({ message: "Serial number required" }, { status: 400 });
    }

    const response = await fetch(
      `http://invtrackapi.runasp.net/api/AssetItem/DeleteAssetItem?SerialNumber=${serialNumber}`,
      {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "فشل الحذف" }, { status: response.status });
    }

    return NextResponse.json({ message: "تم الحذف" }, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}