"use client";

import { useState } from "react";
import "@/components/Dashboard/Modals/NewDevice.css";

type NewDeviceProps = {
    close: () => void;
    addDevice: (name: string, type: string) => void;
}

export default function NewDevice({close, addDevice}: NewDeviceProps) {

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("light");

    return(
        <div className="modalOverlay">
            <div className="modal">
                <h1 className="title">Add a new device</h1>
            <div className="groupContainer">
                <label className="inputLabel">Device name:</label>
                <input
                    placeholder="Bedroom light"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="nameInput"
                />
            </div>
            <div className="groupContainer">
                <label className="inputLabel">Device type:</label>
                <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="dropdown"
                >
                    <option value="light">Light</option>
                    <option value="fan">Fan</option>
                    <option value="radiator">Radiator</option>
                    <option value="thermostat">Thermostat</option>
                </select>
            </div>
            <div className="buttonsContainer">
                <button onClick={() => addDevice(deviceName, deviceType)} className="addButton">Add device</button>
                <button onClick={close} className="cancelButton">Cancel</button>
            </div>
            </div>
        </div>
    )
}