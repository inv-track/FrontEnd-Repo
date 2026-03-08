import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // 👈 لازم GET هنا
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/Location/GetAllBuildingAndFloorsAndRooms",
      {
        method: "GET", // 👈 السيرفر الخارجي GET
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.log("AddEmployee STATUS:", response.status);
      console.log("AddEmployee BODY:", text);

      return NextResponse.json({ message: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
