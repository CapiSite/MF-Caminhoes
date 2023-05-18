import Image from "next/image";
import { useState } from "react";

export default function Photos({ image, setMainImage }: any) {
  const [src, setSrc] = useState("")


  fetch(`http://154.49.246.233:5000/images/secondary/${image}`)
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setSrc(imageUrl);
    });

  return (
    <>
      <Image onClick={() => setMainImage(image)} src={src} alt="Caminhao" width={198} height={198} />
    </>
  )
}