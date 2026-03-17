import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// ===== GET — e.g. /api/Location/GetAllBuildingAndFloorsAndRooms =====
export async function GET(req: NextRequest, context: any) {
  try {
    const params = await context.params;
    const action = params.action;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // ===== DEBUG =====
    console.log("=== Location GET ===");
    console.log("action:", action);
    console.log("token exists:", !!token);
    console.log("token value:", token ? token.substring(0, 30) + "..." : "MISSING");
    // =================

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const backendRes = await fetch(`http://invtrackapi.runasp.net/api/Location/${action}`, {
      method: "GET",
      headers,
    });

    console.log("Backend response status:", backendRes.status);

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
    console.error("API Route GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ===== POST — e.g. /api/Location/AddBuilding =====
export async function POST(req: NextRequest, context: any) {
  try {
    const params = await context.params;
    const action = params.action;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let body = undefined;
    try {
      body = await req.json();
    } catch {
      // Empty body is fine
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const backendRes = await fetch(`http://invtrackapi.runasp.net/api/Location/${action}`, {
      method: "POST",
      headers,
      body: body && Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
    });

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
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
