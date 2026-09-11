import "@/components/Home/Bubble/Bubble.css";
import Image from "next/image";

type BubbleProps = {
    bubbleDescription: string;
    bubbleIcon: string;
}

export default function Bubble(props: BubbleProps) {
    return (
        <div className="bubble">
            <Image src={props.bubbleIcon} alt="bubble icon" width={50} height={50} />
            <h4>{props.bubbleDescription}</h4>
        </div>
    )
}