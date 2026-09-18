"use client";

import { useState } from "react";

import "@/app/dashboard/dashboard.css";
import NewDevice from "@/components/Dashboard/Modals/NewDevice";
import Device from "@/components/Dashboard/Device/Device";

const initialDevices = [
    {
        id: 1,
        name: "",
        state: false,
        type: "light"
    },
    {
        id: 2,
        name: "",
        state: false,
        type: "fan"
    },
    {
        id: 3,
        name: "",
        state: false,
        type: "radiator"
    },
    {
        id: 5,
        name: "",
        state: false,
        type: "thermostat"
    },
];

export default function Dashboard() {

    // 1. Devices state
    const [devices, setDevices] = useState(initialDevices);

    // 2. Modal state
    const [showNewDevice, setShowNewDevice] = useState(false);

    // 3. Function for changing a device's state
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
            }))
    }

    // 4. Function for adding a device

    function addDevice(name: string, type: string) {

        const newDevice = {
            id: devices.length === 0
                ? 1
                : Math.max(...devices.map(device => device.id)) + 1,
            name: name,
            state: false,
            type: type
        };
        setDevices(currentDevices => [
            ...currentDevices,
            newDevice
        ])
        
        setShowNewDevice(false);
    }

    return (
        <main className="mainPageContainer">

            {/* Dashboard header */}
            <div className="dashHead">

                <button
                    className="newDevice"
                    onClick={() => setShowNewDevice(true)}
                >
                    New Device
                </button>

                <label className="totalDevices">
                    Total devices: {devices.length}
                </label>

            </div>


            {/* Device list */}
            <div className="devicesContainer">

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

            </div>


            {/* New Device modal */}
            {showNewDevice && (
                <NewDevice
                    close={() => setShowNewDevice(false)}
                    addDevice={addDevice}
                />
            )}

        </main>
    );
}