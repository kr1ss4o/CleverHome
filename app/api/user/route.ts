import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getCurrentUserId } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {

    // The requested data is converted to json from jsontext
    const data = await request.json();

    try {

        // Check if any field is empty
        if (!data.name || !data.email || !data.password) {
            return Response.json(
                { error: "All field are required. "},
                { status: 400}
            );
        }

        // Find if a user with the entered email already exists in the DB
        const existingUser = await db.orm.public.User
            .where( {
                email: data.email
            })
            .first();

        if (existingUser) {
            return Response.json(
                { error: "Email already exists."},
                { status: 409 }
            )
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the new user
        const user = await db.orm.public.User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
            });

            // Return everything but the passwor since the FE doesn't need it
            return Response.json(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                { status: 202 }
            );
    }
    catch(error) {

        // If the issue couldn't be resolved, error message
        return Response.json(
            { error: "Something went wrong. "},
            { status: 500}
        );
    }
}

export async function GET() {

    // getCurrentUserId() is the function which we import from lib/auth
    // which contains the authenticated user's id
    const userId = await getCurrentUserId();

    // Check if the user is authenticated
    if (!userId) {
        return Response.json(
            { error: "Not authenticated."},
            { status: 401 }
        )
    }

    // Find the user with the authenticated ID
    const user = await db.orm.public.User
        .where({
            id: userId
    }).first();
    
    // No user match condition
    if (!user) {
        return Response.json(
            { error: "User not found." },
            { status: 404 }
        );
    }

    // Return the data of the logged in user
    return Response.json(
        {
            id: user.id,
            name: user?.name,
            email: user.email
        }
    )
}

export async function PUT(request: Request) {

    const userId = await getCurrentUserId();

    if (!userId) {
        return Response.json(
            { error: "Not authenticated."},
            { status: 401 }
        )
    }
    
    const data = await request.json();

    if (
        typeof data.name !== "string" ||
        typeof data.email !== "string" ||
        !data.name.trim() ||
        !data.email.trim()
    ) {
        return Response.json(
            { error: "Valid name and email are required." },
            { status: 400 }
        );
    }

    const response = await db.orm.public.User.where(
        {
            id: userId
        }
    ).update(
        {
            name: data.name,
            email: data.email
        }
    )

    return Response.json({
        message: "Profile updated successfully."
    });
}

export async function DELETE(request: Request) {

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

    if (data.name !== user.name) {
        return Response.json(
            { error: "Name does not match." },
            { status: 400 }
        );
    }

    // Delete the user's devices
    await db.orm.public.Device
        .where({
            userId: userId
        })
        .delete();

    // Delete the user
    await db.orm.public.User
        .where({
            id: userId
        })
        .delete();

    const cookieStore = await cookies();

    // Delete user's cookies
    cookieStore.delete("session");

    return Response.json({
        message: "Account deleted successfully."
    });
}