import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/AssetItem/GetAllCategories",
      {
        headers: { Accept: "*/*", Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { categoryName } = await req.json();

    const response = await fetch(
      `http://invtrackapi.runasp.net/api/AssetItem/AddCategory?categoryName=${categoryName}`,
      {
        method: "POST",
        headers: { Accept: "*/*", Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return NextResponse.json({ message: "فشل الإضافة" }, { status: 400 });

    return NextResponse.json({ message: "تمت الإضافة" }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}