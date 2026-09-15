"use client";
import { useState } from "react";

import "@/components/Dashboard/Device/Device.css"

type DeviceProps = {
    deviceID: number;
    deviceName: string;
    deviceState: boolean;
    deviceType: string;
    toggleDevice: (id: number) => void;
}

export default function Device(props: DeviceProps) {
    
    const [deviceColor, setColor] = useState("#f9fae0");

    function getDeviceIcon(deviceType: string) {
        if (props.deviceType === "light") {
            return "/media/devices/light-icon.png"
        }
        if (props.deviceType === "fan") {
            return "/media/devices/fan-icon.png"
        }
        if (props.deviceType === "radiator") {
            return "/media/devices/radiator-icon.png"
        }

        return "/media/devices/thermometer-icon.png"
    }

    /* Each device type has its own icon */
    const deviceIcon = getDeviceIcon(props.deviceType);

    /* Switch  between green and red color depending on the device's state */
    const stateClass = props.deviceState ? "onlineColor" : "offlineColor";

    return(
        <div className="deviceContainer">
            <div className="deviceInfoContainer">
                <h4 className="deviceTitle">Device ID: {props.deviceID}</h4>
                <h1 className="deviceTitle">{props.deviceName}</h1>
                <h2 className={stateClass+" stateTitle"}>{props.deviceState ? "Online" : "Offline"}</h2>  
            </div>
            <div className="deviceDisplayContainer">
                <img src={deviceIcon} className="deviceImage" />
                <input
                        type="checkbox"
                        checked={props.deviceState}
                        onChange={() => props.toggleDevice(props.deviceID)}
                        className="stateButton"
                />
            </div>
            {props.deviceType === "light" && (
                    <div className="deviceCustomizeContainer">
                        <input
                            type="color"
                            value={deviceColor}
                            onChange={(e) => setColor(e.target.value)}
                            className="colorInput"
                        />
                        <input
                            className="colorHEX"
                            value={deviceColor}
                            onChange={(e)=> setColor(e.target.value)}
                        />
                    </div>
            )}  
        </div>
    )
}