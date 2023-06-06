import { useRouter } from "next/router"
import style from "../styles/HomeStyle.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function CarroselItem({ info, adm }: any) {
  const router = useRouter()
  const [src, setSrc] = useState("")

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${info.main_image}`) 
      .then((response) => response.blob()) 
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl); 
      });
  }, [])

  return (
    <div onClick={() => router.push(`/locacoes/${info.id}`)} className={style.locationsCard}>
      <Image src={src} alt="Caminhão" onError={() => setSrc("/men. erro.png")} width={198} height={198} />
      <h2>{info?.title}</h2>
      <p>R${parseFloat((info?.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button>{adm ? "Ver mais" : "Locar"}</button>
    </div>
  )
}