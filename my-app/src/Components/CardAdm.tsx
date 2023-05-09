import Image from "next/image";
import style from "../styles/AdmStyle.module.css";
import { useRouter } from "next/router";

export default function CardAdm(){
    const router = useRouter()
    return(
        <div onClick={() => router.push(`/admin/1`)} className={style.card}>
            <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
            <div>
            <h1>Caminhão</h1>
            <p>Random | 3 eixos</p>
            </div>
            <p>R$ 10000,00</p>
            <button>Ver mais</button>
        </div>
    )
}
