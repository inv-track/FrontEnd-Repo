import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Employee {
  name: string;
  phoneNumber: string;
  nationalNumber: string;
  building: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const nationalNumber = searchParams.get("nationalNumber");

    if (!nationalNumber) {
      return NextResponse.json({ message: "National number is required" }, { status: 400 });
    }

    const response = await fetch(
      `http://invtrackapi.runasp.net/api/Employee/GetEmployeeByNationalNumber?NationalNumber=${nationalNumber}`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "موظف غير موجود" }, { status: 404 });
    }

    const data: Employee = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}