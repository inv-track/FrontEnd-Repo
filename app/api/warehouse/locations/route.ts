import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Room {
  roomName: string;
}

interface Floor {
  name: string;
  rooms: Room[];
}

interface Building {
  name: string;
  floors: Floor[];
}

export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/Location/GetAllBuildingAndFloorsAndRooms",
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data: Building[] = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}