import Image from "next/image";
import style from "@/styles/AdmStyle.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CardAdm({ info }: { info: any }) {
  const router = useRouter()
  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${info.main_image}`) 
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
      <div className={style.locationsCard}>
        <img src=""/>
      </div>
    )
  }

  return (
    <div onClick={() => router.push(`/admin/${info.id}`)} className={style.card}>
      <Image src={src} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={198} height={198} />
      <div>
        <h1>{info.title}</h1>
        <p>{info.sections} eixos</p>
      </div>
      <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button className={style.button_adm}>Ver mais</button>
    </div>
  )
}
