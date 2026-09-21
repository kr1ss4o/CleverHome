"use client";

import { useState, useEffect } from "react";

import "@/app/dashboard/dashboard.css";
import NewDevice from "@/components/Dashboard/Modals/NewDevice";
import EditDevice from "@/components/Dashboard/Modals/EditDevice";
import DeviceCard from "@/components/Dashboard/Device/DeviceCard";

export default function Dashboard() {

    type Device = {
        id: number;
        name: string;
        state: boolean;
        type: string;
        color: string | null;
        rpm: number | null;
        temperature: number | null;
    };

    // Devices' state receive an array of Device object
    const [devices, setDevices] = useState<Device[]>([]);

    // Dashboard loads the devices
    useEffect(() => {
        async function getDevices() {
            const response = await fetch("/api/devices");
            const data = await response.json();

            // Sort the devices by ID
            const sortedDevices = [...data].sort((a, b) => a.id - b.id);
            setDevices(sortedDevices);
        }
        getDevices();
    }, []);

    // New device modal state
    const [showNewDevice, setShowNewDevice] = useState(false);

    // Edit modal gets the deviceID
    const [editingDeviceID, setEditingDeviceID] = useState<number | null>(null);
    const [editingDeviceName, setEditingDeviceName] = useState("");

    // Function for changing a device's state
    async function toggleDeviceState(id: number) {

        const device = devices.find(device => device.id === id);

        if (!device) {
            return;
        }

        const response = await fetch("/api/devices", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                state: !device.state
            })
        });

        const updatedDevice = await response.json();

        setDevices(currentDevices =>
            currentDevices.map(device =>
                device.id === updatedDevice.id
                    ? updatedDevice
                    : device
            )
        );
    }

    // Function for updating the value of a device (rpm or temperature value)
    async function updateDeviceValue( id: number, valueType: "rpm" | "temperature", value: number) {
        const response = await fetch("/api/devices", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                [valueType]: value
            })
        });

        const updatedDevice = await response.json();

        setDevices(currentDevices =>
            currentDevices.map(device =>
                device.id === updatedDevice.id
                    ? updatedDevice
                    : device
            )
        );
    }

    // Function for adding a device
    async function addDevice(name: string, type: string) {

        const response = await fetch("/api/devices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    name: name,
                    type: type
            })
        });

        const newDevice = await response.json();

        setDevices(currentDevices => [
            ...currentDevices,
            newDevice
        ]);

        setShowNewDevice(false);
    }

    // Function for editing a device
    async function editDeviceName(id: number, newName: string) {
        
        const response = await fetch("/api/devices", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: newName
            })
        })

        const updatedDevice = await response.json();

        setDevices(current =>
            current.map((device) => {
                if (device.id === updatedDevice.id) {
                    return updatedDevice;
                }

                return device;
            })
        )

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
    async function deleteDevice(deleteID: number) {
        const response = await fetch("/api/devices", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: deleteID
            })
        })

        const deletedDevice = await response.json();

        setDevices(current =>
            current.filter((device) => device.id !== deletedDevice.id)
        )
    }

    return (
        <main className="mainPageContainer dashboardContainer">

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
                    <DeviceCard
                        key={device.id}
                        deviceID={device.id}
                        deviceName={device.name}
                        deviceState={device.state}
                        deviceType={device.type}
                        deviceRPM={device.rpm}
                        deviceTemperature={device.temperature}
                        toggleDevice={toggleDeviceState}
                        updateDeviceValue={updateDeviceValue}
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
