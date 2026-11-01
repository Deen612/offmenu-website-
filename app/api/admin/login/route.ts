import { NextResponse } from "next/server";
import { ADMIN_COOKIE, passwordMatches, sessionValue } from "@/lib/admin";
import { allow, clientKey } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const form = await req.formData();
  const url = new URL("/admin", req.url);
  if (!allow(`admin:${clientKey(req)}`, 5) || !passwordMatches(String(form.get("password") ?? ""))) {
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, 303);
  }
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(ADMIN_COOKIE, sessionValue()!, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 12 });
  return res;
}
