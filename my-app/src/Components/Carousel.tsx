import { useRouter } from "next/router"
import style from "../styles/HomeStyle.module.css"
import Image from "next/image"

export default function Carousel({item}:any) {
  const router = useRouter()
    return (

      <div onClick={() => router.push(`/locacoes/${2}`)} className={style.locationsCard}>
        <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
        <h2>{item}</h2>
        <p>random | 3 eixos</p>
        <p>R$ 10000,00</p>
        <button>Comprar</button>
      </div>
    )
}