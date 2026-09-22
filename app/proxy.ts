import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET
);

export async function proxy(request: NextRequest) {

    const session = request.cookies.get("session");

    if (!session) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    try {

        await jwtVerify(session.value, secret);

        return NextResponse.next();

    } catch {

        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/account/:path*"]
};