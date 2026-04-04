import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface AssetRequest {
  serialNumber: string;
  requestedQuantity: number;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const fromNationalId = searchParams.get("fromNationalId");
    const toNationalId = searchParams.get("toNationalId");
    const createdByUser = searchParams.get("createdByUser");

    const body: AssetRequest[] = await req.json();

    const response = await fetch(
      `http://invtrackapi.runasp.net/api/Transaction/GenerateTransfearAssetPDF?fromNationalId=${fromNationalId}&toNationalId=${toNationalId}&createdByUser=${createdByUser}`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "فشل تنفيذ العملية" },
        { status: response.status }
      );
    }

    const pdfBuffer = await response.arrayBuffer();
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: { "Content-Type": "application/pdf", "Content-Disposition": "inline" },
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}