import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Category {
  name: string;
}

interface AddCategoryRequest {
  categoryName: string;
}

export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/AssetItem/GetAllCategories",
      {
        headers: { Accept: "*/*", Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    const data: Category[] = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { categoryName }: AddCategoryRequest = await req.json();

    const response = await fetch(
      `http://invtrackapi.runasp.net/api/AssetItem/AddCategory?categoryName=${categoryName}`,
      {
        method: "POST",
        headers: { Accept: "*/*", Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "فشل الإضافة" }, { status: 400 });
    }

    return NextResponse.json({ message: "تمت الإضافة" }, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}