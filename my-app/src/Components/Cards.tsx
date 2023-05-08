import { useRouter } from "next/router"
import style from "../styles/LocationsStyle.module.css"
import Image from "next/image"

export default function Cards({ item, index, ct, setCt, id }: any) {
  const router = useRouter()
  if (index < ct) {
    return (

      <div onClick={() => router.push(`/Locacoes/${2}`)} className={style.locationsCard}>
        <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
        <h2>Caminhão lajfdlak lkjasflksa ljalkdfja</h2>
        <p>random | 3 eixos</p>
        <p>R$ 10000,00</p>
        <button>Comprar</button>
      </div>
    )
  }
  else {
    return <></>
  }
}