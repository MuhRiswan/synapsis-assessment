import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const response = await apiClient.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return NextResponse.json({ valid: true });
    }
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: false }, { status: 401 });
}
