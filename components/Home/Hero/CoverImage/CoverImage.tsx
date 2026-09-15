import Image from "next/image";
import  "@/components/Home/Hero/CoverImage/CoverImage.css";

type CoverImageProps = {
    coverImage: string;
}

export default function CoverImage({coverImage}: CoverImageProps) {
    return(
        <Image src={coverImage} alt="Cover Image" className="image" loading="eager" width={1000} height={800}/>
    )
}