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
        <div className="modalOverlay">
            <div className="modal">
                <h1 className="title">Edit your device</h1>
            <div className="groupContainer">
                <label className="inputLabel">New device name:</label>
                <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="nameInput"
                />
            </div>
            <div className="buttonsContainer">
                <button onClick={() => editDeviceName(deviceID, editName)} className="addButton">Edit device</button>
                <button onClick={close} className="cancelButton">Cancel</button>
            </div>
            </div>
        </div>
    )
}