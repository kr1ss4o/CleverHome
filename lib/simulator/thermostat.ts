export function simulateThermostat(
    currentTemperature: number,
    targetTemperature: number,
    state: boolean
) {

    if (!state) {
        return {
            status: "offline",
            currentTemperature: 0,
            targetTemperature: 0,
            heating: false
        };
    }

    const heating = currentTemperature < targetTemperature;

    return {
        status: heating ? "heating" : "stable",
        currentTemperature,
        targetTemperature,
        heating
    };
}