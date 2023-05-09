import { useRouter } from "next/router"
import style from "../styles/LocationsStyle.module.css"
import Image from "next/image"

export default function Cards({ index, ct, image, id, title, sections, price, setCt }: any) {
  const router = useRouter()
  if (index < ct) {
    return (
      <div onClick={() => router.push(`/locacoes/${id}`)} className={style.locationsCard}>
        <Image src={`/main/${image}`} alt="Caminhão" width={198} height={198} />
        <h2>{title}</h2>
        <p>{sections} eixos</p>
        <p>R$ {parseFloat((price/100).toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2})}</p>
        <button>Comprar</button>
      </div>
    )
  }
  else {
    return <></>
  }
}