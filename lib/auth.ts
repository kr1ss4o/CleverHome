import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET
);

export async function createSession(userId: number) {
    return await new SignJWT({
        userId: userId
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function getCurrentUserId() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(session.value, secret);

        return payload.userId as number;
    } catch {
        return null;
    }
}