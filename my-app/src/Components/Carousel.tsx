import { useRouter } from "next/router"
import style from "../styles/HomeStyle.module.css"
import Image from "next/image"

export default function Carousel({info, adm}:any) {
  const router = useRouter()
    return (

      <div onClick={() => router.push(`/locacoes/${info.id}`)} className={style.locationsCard}>
        <Image src={`/main/${info?.main_image}`} alt="Caminhão" width={198} height={198} />
        <h2>{info?.title}</h2>
        <p>{info?.sections} eixos</p>
        <p>R${parseFloat((info?.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
        <button>{adm?"Ver mais":"Locar"}</button>
      </div>
    )
}