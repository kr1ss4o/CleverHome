export function simulateLight(
    state: boolean
) {

    if (!state) {
        return {
            status: "offline",
            brightness: 0,
            powerConsumption: 0
        };
    }

    return {
        status: "active",
        brightness: 100,
        powerConsumption: 12
    };
}