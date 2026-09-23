export function simulateFan(
    state: boolean,
    rpm: number
) {

    if (!state) {
        return {
            status: "offline",
            rpm: 0,
            powerConsumption: 0
        };
    }

    return {
        status: "active",
        rpm,
        powerConsumption: Math.round(rpm * 0.02)
    };
}