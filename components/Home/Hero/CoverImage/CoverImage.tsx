import Image from "next/image";
import  style from "@/components/Home/Hero/CoverImage/CoverImage";

type CoverImageProps = {
    coverImage: string;
}

export default function CoverImage({coverImage}: CoverImageProps) {
    return(
        <Image src={coverImage} alt="Cover Image" className="image" width={1000} height={800}/>
    )
}