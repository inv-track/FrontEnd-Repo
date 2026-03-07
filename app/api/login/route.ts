import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface LoginRequest {
  userName: string;
  password: string;
}

interface LoginResponse {
  isAuthenticated: boolean;
  token: string;
  userName: string;
  role: string;
  ssn: string;
  message?: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: LoginRequest = await req.json();

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/Authentication/LoginAdmin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(body),
      }
    );

    const data: LoginResponse = await response.json();
    console.log("Login response data:", data);

    if (!response.ok || !data.isAuthenticated) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    cookieStore.set(
      "user",
      JSON.stringify({
        userName: data.userName,
        role: data.role,
        ssn: data.ssn,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      }
    );

    return NextResponse.json(
      { message: "Login successful", user: data.userName, role: data.role },
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error("Login API Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}