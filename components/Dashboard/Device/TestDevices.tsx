import Device from "./Device";
const testDevices = [
    {
        id: 1,
        name: "Living Room Light",
        state: true
    },
    {
        id: 2,
        name: "Bedroom Light",
        state: false
    },
    {
        id: 3,
        name: "Kitchen Light",
        state: true
    }
];

export default function TestDevices() {
    
    return (
        <>
            {testDevices.map((device) => (
                <Device
                    key={device.id}
                    deviceID={device.id}
                    deviceName={device.name}
                    deviceState={device.state}
                />
            ))}
        </>
    )
}