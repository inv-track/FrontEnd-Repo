import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, context: any) {
  try {
    const params = await context.params;
    const action = params.action;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Forward query params (buildingName, floorName, roomName)
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    const url = `http://invtrackapi.runasp.net/api/AssetItem/${action}${queryString ? `?${queryString}` : ''}`;

    const backendRes = await fetch(url, { method: "GET", headers });

    let data;
    const contentType = backendRes.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await backendRes.json();
    } else {
      const text = await backendRes.text();
      data = { message: text || "Success or empty response" };
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("AssetItem GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}