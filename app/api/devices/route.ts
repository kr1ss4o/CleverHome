import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import { simulateDevice } from "@/lib/simulator";

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

    const devicesWithSimulation = devices.map(device => ({
        ...device,
        simulation: simulateDevice(device)
    }));

    return Response.json(devicesWithSimulation);
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

    const userId = await getCurrentUserId();

    if (!userId) {
        return Response.json(
            { error: "Not authenticated." },
            { status: 401 }
        );
    }

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

    const updatedDevice = await db.orm.public.Device
    .where({
        id: data.id,
        userId: userId
    })
    .update(updateData);

    return Response.json({
        ...updatedDevice,
        simulation: simulateDevice(updatedDevice)
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

    const deletedDevice = await db.orm.public.Device
    .where({
        id: data.id,
        userId: userId
    })
    .delete();

    return Response.json(deletedDevice);
}