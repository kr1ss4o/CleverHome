import { simulateLight } from "./light";
import { simulateFan } from "./fan";
import { simulateRadiator } from "./radiator";
import { simulateThermostat } from "./thermostat";


export function simulateDevice(device: any) {

    switch (device.type) {

        case "light":
            return simulateLight(
                device.state
            );


        case "fan":
            return simulateFan(
                device.state,
                device.rpm ?? 0
            );


        case "radiator":
            return simulateRadiator(
                device.temperature ?? 20,
                device.state
            );


        case "thermostat":
            return simulateThermostat(
                device.temperature ?? 20,
                device.targetTemperature ?? 22,
                device.state
            );


        default:
            return {
                status: "unknown"
            };
    }
}