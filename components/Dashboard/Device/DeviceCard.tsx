"use client";

import { useEffect, useState } from "react";

import "@/components/Dashboard/Device/DeviceCard.css";

type DeviceProps = {
    deviceID: number;
    deviceName: string;
    deviceState: boolean;
    deviceType: string;
    deviceRPM: number | null;
    deviceTemperature: number | null;
    
    simulation?: {
    brightness?: number;
    powerConsumption?: number;
    rpm?: number;
    temperature?: number;
    currentTemperature?: number;
    targetTemperature?: number;
    heating?: boolean;
    };

    toggleDevice: (id: number) => void;
    updateDeviceValue: (
        id: number,
        valueType: "rpm" | "temperature",
        value: number
    ) => void;

    openEditModal: (id: number) => void;
    currentDeviceName: (name: string) => void;
    deleteDevice: (id: number) => void;
};

function useAnimatedValue(targetValue: number) {
    const [displayedValue, setDisplayedValue] = useState(targetValue);

    useEffect(() => {
        const animation = window.setInterval(() => {
            setDisplayedValue((currentValue) => {
                const difference = targetValue - currentValue;

                if (Math.abs(difference) < 1) {
                    window.clearInterval(animation);
                    return targetValue;
                }

                const step = Math.max(1, Math.round(Math.abs(difference) * 0.12));
                return currentValue + Math.sign(difference) * Math.min(step, Math.abs(difference));
            });
        }, 40);

        return () => window.clearInterval(animation);
    }, [targetValue]);

    return displayedValue;
}

export default function Device(props: DeviceProps) {

    /* Lights values */
    const [deviceColor, setColor] = useState("#f9fae0");

    /* Fan input */
    const [inputRPM, setInputRPM] = useState(
        props.deviceRPM ?? 350
    );

    const targetRPM = props.deviceState ? props.deviceRPM ?? 0 : 0;
    const displayedRPM = useAnimatedValue(targetRPM);
    const displayedBrightness = useAnimatedValue(props.simulation?.brightness ?? 0);
    const displayedPower = useAnimatedValue(props.simulation?.powerConsumption ?? 0);
    const displayedTemperature = useAnimatedValue(
        props.simulation?.temperature ?? props.simulation?.currentTemperature ?? 0
    );
    const displayedTargetTemperature = useAnimatedValue(
        props.simulation?.targetTemperature ?? 0
    );

    /* Radiator input */
    const [inputRadiatorTemp, setInputRadiatorTemp] = useState(
        props.deviceTemperature ?? 20
    );

    /* Thermostat input */
    const [inputThermoTemp, setInputThermoTemp] = useState(
        props.deviceTemperature ?? 20
    );

    function getDeviceIcon(deviceType: string) {

        if (props.deviceType === "light") {
            return "/media/devices/light-icon.png";
        }

        if (props.deviceType === "fan") {
            return "/media/devices/fan-icon.png";
        }

        if (props.deviceType === "radiator") {
            return "/media/devices/radiator-icon.png";
        }

        return "/media/devices/thermometer-icon.png";
    }

    function deviceSimulation() {

    }


    /* Each device type has its own icon */
    const deviceIcon = getDeviceIcon(props.deviceType);

    /* Switch between green and red color depending on the device's state */
    const stateClass = props.deviceState
        ? "onlineColor"
        : "offlineColor";


    return (
        <div className="deviceContainer">

            <div className="deviceInfoContainer">

                <h4 className="deviceTitle">
                    Device ID: {props.deviceID}
                </h4>

                <h1 className="deviceTitle">
                    {props.deviceName}
                </h1>

                <h2 className={stateClass + " stateTitle"}>
                    {props.deviceState ? "Online" : "Offline"}
                </h2>
            
                {props.simulation && (
                    <div className="simulationInfo">
                        {props.simulation.brightness !== undefined && (
                            <p>
                                <span className="simulationLabel">Brightness</span>
                                <span className="simulationValue">
                                    {displayedBrightness}%
                                </span>
                            </p>
                        )}
                    
                        {props.simulation.powerConsumption !== undefined && (
                            <p>
                                <span className="simulationLabel">Power</span>
                                <span className="simulationValue">
                                    {displayedPower}W
                                </span>
                            </p>
                        )}

                        {props.simulation.temperature !== undefined && (
                            <p>
                                <span className="simulationLabel">Temperature</span>
                                <span className="simulationValue">
                                    {displayedTemperature}°C
                                </span>
                            </p>
                        )}

                        {props.simulation.currentTemperature !== undefined && (
                            <p>
                                <span className="simulationLabel">Current</span>
                                <span className="simulationValue">
                                    {displayedTemperature}°C
                                </span>
                            </p>
                        )}

                        {props.simulation.targetTemperature !== undefined && (
                            <p>
                                <span className="simulationLabel">Target</span>
                                <span className="simulationValue">
                                    {displayedTargetTemperature}°C
                                </span>
                            </p>
                        )}

                        {props.simulation.heating !== undefined && (
                            <p>
                                <span className="simulationLabel">Mode</span>
                                <span className="simulationValue">
                                    {!props.deviceState
                                        ? "Off"
                                        : props.simulation.heating
                                            ? "Heating"
                                            : "Stable"
                                    }
                                </span>
                            </p>
                        )}
                    </div>
                )}

                <div className="manageDevice">

                    <button
                        className="editDevice"
                        onClick={() => {
                            props.openEditModal(props.deviceID);
                            props.currentDeviceName(props.deviceName);
                        }}
                    >
                        <img
                            className="buttonIcon"
                            src="/media/icons/edit-icon.png"
                        />
                    </button>

                    <button
                        className="deleteDevice"
                        onClick={() => props.deleteDevice(props.deviceID)}
                    >
                        <img
                            className="buttonIcon"
                            src="/media/icons/delete-icon.png"
                        />
                    </button>

                </div>

            </div>


            <div className={
                `deviceDisplayContainer ${props.deviceState ? "isActive" : ""}`
            }>

                <div className="deviceImageFrame">
                    <img
                        src={deviceIcon}
                        className={`deviceImage deviceImage-${props.deviceType}`}
                    />
                </div>

                <input
                    type="checkbox"
                    checked={props.deviceState}
                    onChange={() => props.toggleDevice(props.deviceID)}
                    className="stateButton"
                />

            </div>


            {/* LIGHT */}

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
                        onChange={(e) => setColor(e.target.value)}
                    />

                </div>

            )}


            {/* FAN */}

            {props.deviceType === "fan" && (

                <div className="deviceControlsContainer">

                    <h1 className="displayDeviceValue">
                        Current: {displayedRPM} RPM
                    </h1>

                    <input
                        type="range"
                        min="100"
                        max="400"
                        step="50"
                        value={inputRPM}
                        onChange={(e) =>
                            setInputRPM(Number(e.target.value))
                        }
                        className="inputSlider"
                    />

                    <h1 className="displayDeviceValue">
                        {inputRPM} RPM
                    </h1>

                    <button
                        className="deviceApplyButton"
                        onClick={() =>
                            props.updateDeviceValue(
                                props.deviceID,
                                "rpm",
                                inputRPM
                            )
                        }
                    >
                        Apply
                    </button>

                </div>

            )}


            {/* RADIATOR */}

            {props.deviceType === "radiator" && (

                <div className="deviceControlsContainer">

                    <h1 className="displayDeviceValue">
                        {props.deviceState
                            ? `Current: ${props.deviceTemperature ?? 0} °C`
                            : "Current: 0 °C"
                        }
                    </h1>

                    <input
                        type="range"
                        min="10"
                        max="30"
                        value={inputRadiatorTemp}
                        onChange={(e) =>
                            setInputRadiatorTemp(
                                Number(e.target.value)
                            )
                        }
                        className="inputSlider"
                    />

                    <h1 className="displayDeviceValue">
                        {inputRadiatorTemp} °C
                    </h1>

                    <button
                        className="deviceApplyButton"
                        onClick={() =>
                            props.updateDeviceValue(
                                props.deviceID,
                                "temperature",
                                inputRadiatorTemp
                            )
                        }
                    >
                        Apply
                    </button>

                </div>

            )}


            {/* THERMOSTAT */}

            {props.deviceType === "thermostat" && (

                <div className="deviceControlsContainer">

                    <h1 className="displayDeviceValue">
                        {props.deviceState
                            ? `Current: ${props.deviceTemperature ?? 0} °C`
                            : "Current: 0 °C"
                        }
                    </h1>

                    <input
                        type="range"
                        min="10"
                        max="30"
                        value={inputThermoTemp}
                        onChange={(e) =>
                            setInputThermoTemp(
                                Number(e.target.value)
                            )
                        }
                        className="inputSlider"
                    />

                    <h1 className="displayDeviceValue">
                        {inputThermoTemp} °C
                    </h1>

                    <button
                        className="deviceApplyButton"
                        onClick={() =>
                            props.updateDeviceValue(
                                props.deviceID,
                                "temperature",
                                inputThermoTemp
                            )
                        }
                    >
                        Apply
                    </button>

                </div>

            )}

        </div>
    );
}