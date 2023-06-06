import Image from "next/image";
import { useEffect, useState } from "react";

export default function Photos({ image, setMainImage }: any) {
  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/secondary/${image}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl);
        setRender(true)
      })
      .catch(() =>{
        setRender(true)
      })
  }, [])

  if (!render) {
    return (
      <img src=""/>
    )
  }

  return (
    <>
      <Image onClick={() => setMainImage(src)} onError={() => setSrc("/men. erro.png")} src={src} alt="Imagem não encontrada" width={198} height={198} />
    </>
  )
}