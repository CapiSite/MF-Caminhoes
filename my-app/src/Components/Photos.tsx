import Image from "next/image";
import { useEffect, useState } from "react";

export default function Photos({ image, setMainImage }: any) {
  const [src, setSrc] = useState("")

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/secondary/${image}`)
  .then((response) => response.blob())
  .then((blob) => {
    const imageUrl = URL.createObjectURL(blob);
    setSrc(imageUrl);
  })},[])
  

  return (
    <>
      <Image onClick={() => setMainImage(src)} src={src} alt="Caminhao" width={198} height={198} />
    </>
  )
}