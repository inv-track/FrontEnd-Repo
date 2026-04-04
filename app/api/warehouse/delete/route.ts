import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface DeleteAssetRequest {
  serialNumber: string;
  quantityToDelete: number;
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: DeleteAssetRequest = await req.json();

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/AssetItem/DeleteAssetItem",
      {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return NextResponse.json(
        { message: data?.message || "فشل الحذف" },
        { status: response.status }
      );
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