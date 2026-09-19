"use client";

import { useState } from "react";

import "@/app/dashboard/dashboard.css";
import NewDevice from "@/components/Dashboard/Modals/NewDevice";
import EditDevice from "@/components/Dashboard/Modals/EditDevice";
import Device from "@/components/Dashboard/Device/Device";

const initialDevices = [
    {
        id: 1,
        name: "Kitchen Light",
        state: false,
        type: "light"
    },
    {
        id: 2,
        name: "Bedroom Ceiling Fan",
        state: false,
        type: "fan"
    },
    {
        id: 3,
        name: "Kids' Radiator",
        state: false,
        type: "radiator"
    },
    {
        id: 5,
        name: "Home Thermostat",
        state: false,
        type: "thermostat"
    },
];

export default function Dashboard() {

    // Devices state
    const [devices, setDevices] = useState(initialDevices);

    // New device modal state
    const [showNewDevice, setShowNewDevice] = useState(false);

    // Edit modal gets the deviceID
    const [editingDeviceID, setEditingDeviceID] = useState<number | null>(null);
    const [editingDeviceName, setEditingDeviceName] = useState("");

    // Function for changing a device's state
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

    // Function for adding a device

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

    // Function for editing a device

    function editDeviceName(id: number, newName: string) {
        setDevices(currentDevices =>
            currentDevices.map((device) => {
                if (device.id === id) {
                    return {
                        ...device,
                        name: newName
                    }
                }

                return device;
            }))
        
        setEditingDeviceID(null);
    }

    // Function for receiving the id of the device being edited

    function openEditModal(id: number) {
        setEditingDeviceID(id);
    }

    // Function for receiving the name of the device being edited

    function currentDeviceName(currentName: string) {
        setEditingDeviceName(currentName);
    }

    // Function for deleting a device

    function deleteDevice(deleteID: number) {
        setDevices(currentDevices => 
            currentDevices.filter((device) => device.id !== deleteID)
        )
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
                        openEditModal={openEditModal}
                        currentDeviceName={currentDeviceName}
                        deleteDevice={deleteDevice}
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
            
            {/* Edit Device modal */}
            {editingDeviceID !== null && (
                <EditDevice
                    deviceID={editingDeviceID}
                    deviceName={editingDeviceName}
                    editDeviceName={editDeviceName}
                    close={() => setEditingDeviceID(null)}
                />
            )
                
            }

        </main>
    );
}