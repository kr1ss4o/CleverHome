import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getCurrentUserId } from "@/lib/auth";

export async function PUT(request: Request) {

    const userId = await getCurrentUserId();

    if (!userId) {
        return Response.json(
            { error: "Not authenticated." },
            { status: 401 }
        );
    }

    const data = await request.json();

    const user = await db.orm.public.User
        .where({
            id: userId
        })
        .first();

    if (!user) {
        return Response.json(
            { error: "User not found." },
            { status: 404 }
        );
    }

    const passwordMatch = await bcrypt.compare(
        data.currentPassword,
        user.password
    );

    if (!passwordMatch) {
        return Response.json(
            { error: "Current password is incorrect." },
            { status: 401 }
        );
    }

    const hashedPassword = await bcrypt.hash(
        data.newPassword,
        10
    );

    await db.orm.public.User
        .where({
            id: userId
        })
        .update({
            password: hashedPassword
        });

    return Response.json({
        message: "Password changed successfully."
    });
}