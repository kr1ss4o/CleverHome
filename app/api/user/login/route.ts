import db from "@/lib/db";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {

    const data = await request.json();

    // Match the email
    const user = await db.orm.public.User.where(
        {
            email: data.email
        }
    ).first();

    // If user NaN, we couldn't match an email in the system
    if (!user) {
        return Response.json(
            { error: "Invalid email or password."},
            { status: 401 }
        )
    }

    // Match the password
    const passwordMatch = await bcrypt.compare(
        // Comparing the inputed password...
        data.password,
        // ... with the password of the user with the matched email
        user.password
    )

    // If passwordMatch NaN, we couldn't match a passowrd in the system
    if (!passwordMatch) {
        return Response.json(
            { error: "Invalid email or password."},
            { status: 401 }
        )
    }

    const token = await createSession(user.id);

    const cookieStore = await cookies();
    
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });

    return Response.json(
        {
            id: user.id,
            name: user.name,
            email: user.email
        }
    )
}