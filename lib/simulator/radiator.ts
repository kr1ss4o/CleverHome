export function simulateRadiator(
    temperature: number,
    state: boolean
) {

    if (!state) {
        return {
            status: "offline",
            temperature: 0,
            powerConsumption: 0
        };
    }

    return {
        status: temperature > 20 ? "heating" : "idle",
        temperature,
        powerConsumption:
            temperature > 20 ? 1500 : 0
    };
}