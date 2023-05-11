import Image from "next/image";
import style from "@/styles/AdmStyle.module.css";
import { useRouter } from "next/router";

export default function CardAdm({info} : {info: any}) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/admin/${info.id}`)} className={style.card}>
      <Image src={`/main/${info.main_image}`} alt="Caminhão" width={198} height={198} />
      <div>
        <h1>{info.title}</h1>
        <p>{info.sections} eixos</p>
      </div>
      <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button className={style.button_adm}>Ver mais</button>
    </div>
  )
}
