"use client";
import { useState } from "react";
import "@/components/Dashboard/Modals/EditDevice.css";

type EditDeviceProps = {
    deviceID: number;
    deviceName: string;
    editDeviceName: (id: number, newName: string) => void;
    close: () => void;
}
export default function EditDevice({deviceID, deviceName, editDeviceName, close}: EditDeviceProps) {

    const [editName, setEditName] = useState(deviceName);

    return(
        <div className="deviceModalOverlay">
            <div className="modal">
                <h1 className="title">Edit your device</h1>
            <div className="groupContainer">
                <label htmlFor="edit-device-name" className="inputLabel">New device name:</label>
                <input
                    id="edit-device-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="nameInput"
                />
            </div>
            <div className="buttonsContainer">
                <button onClick={close} className="cancelButton">Cancel</button>
                <button onClick={() => editDeviceName(deviceID, editName)} className="addButton">Edit device</button>
            </div>
            </div>
        </div>
    )
}
