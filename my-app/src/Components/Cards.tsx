import { useRouter } from "next/router"
import style from "../styles/LocationsStyle.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Cards({ index, ct, image, id, title, price }: any) {
  const router = useRouter()

  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    setRender(true)
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${image}`) 
      .then((response) => response.blob()) 
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl); 
      });
  }, [image])

  if (!render) {
    return (
      <div onClick={() => router.push(`/locacoes/${id}`)} className={style.locationsCard}>
        <img src=""/>
      </div>
    )
  }

  if (index < ct) {
    return (
      <div onClick={() => router.push(`/locacoes/${id}`)} className={style.locationsCard}>
        <Image src={src} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={198} height={198} />
        <h2>{title}</h2>
        <p>R$ {parseFloat((price/100).toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2})}</p>
        <button>Locar</button>
      </div>
    )
  }
  else {
    return <></>
  }
}