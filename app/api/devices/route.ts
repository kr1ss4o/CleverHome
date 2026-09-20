import db from "@/lib/db";

export async function GET() {
    const devices = await db.orm.public.Device.all();

    return Response.json(devices);
}

type DeviceDataType = {
    name: string,
    state: boolean,
    type: string,
    color?: string,
    rpm?: number,
    temperature?: number
}
export async function POST(request: Request) {

    // The data sent by the request is converted into json from json text
    const data: DeviceDataType = await request.json();

    const device = await db.orm.public.Device.create({
        name: data.name,
        type: data.type,
        color: data.color,
        rpm: data.rpm,
        temperature: data.temperature
    });

    return Response.json(device);
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