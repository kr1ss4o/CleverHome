import "@/components/Dashboard/Device/Device.css"

type DeviceProps = {
    deviceID: number;
    deviceName: string;
    deviceState: boolean;
    deviceType: string;
}

export default function Device(props: DeviceProps) {
    

    function DeviceIcon() {
        if (props.deviceType == "light") {

        }
        else if (props.deviceType == "radiator") {

        }
        else if (props.deviceType == "fan") {

        }
        else {

        }
    }

    const deviceIcon = {
        
    }

    const stateClass = props.deviceState ? "onlineTitle" : "offlineTitle";

    return(
        <div className="deviceContainer">
            <div className="deviceInfoContainer">
                <h4 className="idTitle">ID: {props.deviceID}</h4>
                <h1 className="nameTitle">DEVICE: {props.deviceName}</h1>
                <h2 className={stateClass}>{props.deviceState ? "Online" : "Offline"}</h2>
            </div>
        </div>
    )
}