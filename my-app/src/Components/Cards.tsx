import { useRouter } from "next/router"
import style from "../styles/LocationsStyle.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Cards({ index, ct, image, id, title, sections, price }: any) {
  const router = useRouter()

  const [src, setSrc] = useState("")

  useEffect(() => {
    fetch(`http://154.49.246.233:5000/images/main/${image}`) 
      .then((response) => response.blob()) 
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl); 
      });
  }, [image])

  if (index < ct) {
    return (
      <div onClick={() => router.push(`/locacoes/${id}`)} className={style.locationsCard}>
        <Image src={src} alt="Caminhão" width={198} height={198} />
        <h2>{title}</h2>
        <p>{sections} eixos</p>
        <p>R$ {parseFloat((price/100).toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2})}</p>
        <button>Locar</button>
      </div>
    )
  }
  else {
    return <></>
  }
}