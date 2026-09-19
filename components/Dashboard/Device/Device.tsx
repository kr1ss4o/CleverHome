"use client";
import { useState } from "react";

import "@/components/Dashboard/Device/Device.css"

type DeviceProps = {
    deviceID: number;
    deviceName: string;
    deviceState: boolean;
    deviceType: string;
    toggleDevice: (id: number) => void;
    openEditModal: (id: number) => void;
    currentDeviceName: (name: string) => void;
    deleteDevice: (id: number) => void;
}

export default function Device(props: DeviceProps) {

    /* Lights values */
    const [deviceColor, setColor] = useState("#f9fae0");

    /* Fan values  */
    const [inputRPM, setInputRPM] = useState(0);
    const [deviceRPM, setDeviceRPM] = useState(350);

    /* Radiator values */
    const [inputRadiatorTemp, setInputRadiatorTemp] = useState(20);
    const [deviceRadiatorTemp, setDeviceRadiatorTemp] = useState(20);


    /* Thermostat values  */
    const [inputThermoTemp, setInputThermoTemp] = useState(20);
    const [deviceThermoTemp, setDeviceThermoTemp] = useState(20);


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
                <div className="manageDevice">
                    <button className="editDevice" onClick={() => {
                        props.openEditModal(props.deviceID);
                        props.currentDeviceName(props.deviceName);
                    }}>
                        <img className="buttonIcon" src="/media/icons/edit-icon.png"/>
                    </button>
                    <button className="deleteDevice" onClick={()=> props.deleteDevice(props.deviceID)}>
                        <img className="buttonIcon" src="/media/icons/delete-icon.png"/>
                    </button>
                </div>  
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
                <div className="deviceControlsContainer">
                    <input
                        type="color"
                        value={deviceColor}
                        onChange={(e) => setColor(e.target.value)}
                        className="colorInput"
                    />
                    <input
                        className="deviceValueInput"
                        value={deviceColor}
                        onChange={(e)=> setColor(e.target.value)}
                    />
                </div>
            )}
            {props.deviceType === "fan" && (
                <div className="deviceControlsContainer">
                    <h1 className="displayDeviceValue">
                        {props.deviceState ? `Current: ${deviceRPM} RPM` : "Current: 0 RPM"}
                    </h1>
                    <input
                        type="range"
                        min="100"
                        max="400"
                        step="50"
                        onChange={(e)=> setInputRPM(Number(e.target.value))}
                        className="inputSlider"
                    />
                    <h1 className="displayDeviceValue">{inputRPM} RPM</h1>
                    <button
                        className="deviceApplyButton"
                        onClick={() => setDeviceRPM(inputRPM)}
                    >
                    Apply
                    </button>
                </div>
            )}
            { props.deviceType === "radiator" && (
                <div className="deviceControlsContainer">
                    <h1 className="displayDeviceValue"> {props.deviceState ? `Current: ${deviceRadiatorTemp} °C` : "Current: 0 °C"}</h1>
                    <input
                        type="range"
                        min="10"
                        max="30"
                        onChange={(e)=> setInputRadiatorTemp(Number(e.target.value))}
                        className="inputSlider"
                    />
                    <h1 className="displayDeviceValue">{inputRadiatorTemp} °C</h1>
                    <button
                        className="deviceApplyButton"
                        onClick={() => setDeviceRadiatorTemp(inputRadiatorTemp)}
                    >
                    Apply
                    </button>
                </div>
            )}
            { props.deviceType === "thermostat" && (
                <div className="deviceControlsContainer">
                    <h1 className="displayDeviceValue"> {props.deviceState ? `Current: ${deviceThermoTemp} °C` : "Current: 0 °C"} </h1>
                    <input
                        type="range"
                        min="10"
                        max="30"
                        onChange={(e)=> setInputThermoTemp(Number(e.target.value))}
                        className="inputSlider"
                    />
                    <h1 className="displayDeviceValue">{inputThermoTemp} °C</h1>
                    <button
                        className="deviceApplyButton"
                        onClick={() => setDeviceThermoTemp(inputThermoTemp)}
                    >
                    Apply
                    </button>
                </div>
            )}
        </div>
    )
}