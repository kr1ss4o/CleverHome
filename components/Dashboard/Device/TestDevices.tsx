"use client";

import Device from "./Device";
import { useState } from "react";

const initialDevices = [
    {
        id: 1,
        name: "Living Room Light",
        state: true,
        type: "light"
    },
    {
        id: 2,
        name: "Kitchen Fan",
        state: false,
        type: "fan"
    },
    {
        id: 3,
        name: "Bedroom Radiator",
        state: true,
        type: "radiator"
    },
    {
        id: 4,
        name: "Main House Thermometer",
        state: false,
        type: "thermometer"
    }
];

export default function TestDevices() {
    
    const [devices, setDevices ] = useState(initialDevices);

    function toggleDeviceState(id: number) {
        setDevices(currentDevices => 
            currentDevices.map((device) => {

                if (device.id === id) {
                    return {
                        ...device,
                        state: !device.state
                    }
                }

                return device;
            })
        );
    }

    return (
        <>
            {devices.map((device) => (
                <Device
                    key={device.id}
                    deviceID={device.id}
                    deviceName={device.name}
                    deviceState={device.state}
                    deviceType={device.type}
                    toggleDevice={toggleDeviceState}
                />
            ))}
        </>
    )
}