import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

type DeviceDataType = {
    name: string,
    state: boolean,
    type: string,
    color?: string,
    rpm?: number,
    temperature?: number
}

export async function GET() {

    const userId = await getCurrentUserId();

    if (!userId) {
        return Response.json(
            { error: "Not authenticated." },
            { status: 401 }
        );
    }

    const devices = await db.orm.public.Device.where(
        { userId: userId }
    ).all();

    return Response.json(devices);
}

export async function POST(request: Request) {

    const userId = await getCurrentUserId();

    if (!userId) {
        return Response.json(
            { error: "Not authenticated." },
            { status: 401 }
        )
    }

    // The data sent by the request is converted into json from json text
    const data: DeviceDataType = await request.json();

    const device = await db.orm.public.Device.create({
        userId: userId,
        name: data.name,
        type: data.type,
        color: data.color,
        rpm: data.rpm,
        temperature: data.temperature
    });

    return Response.json(device, { status: 201 });
}

export async function PUT(request: Request) {
    
    const data = await request.json();

    const updateData: {
        name?: string;
        state?: boolean;
        rpm?: number;
        temperature?: number;
    } = {};

    if (data.name !== undefined) {
        updateData.name = data.name;
    }

    if (data.state !== undefined) {
        updateData.state = data.state;
    }

    if (data.rpm !== undefined) {
        updateData.rpm = data.rpm;
    }

    if (data.temperature !== undefined) {
        updateData.temperature = data.temperature;
    }

    const device = await db.orm.public.Device
        .where({ id: data.id })
        .update(updateData);

    return Response.json(device);
}

export async function DELETE(request: Request) {
    const data = await request.json();

    const deletedDevice = await db.orm.public.Device
        .where({ id: data.id })
        .delete();

    return Response.json(deletedDevice);
}