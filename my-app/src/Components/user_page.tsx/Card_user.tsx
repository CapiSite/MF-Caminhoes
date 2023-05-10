import Image from "next/image";
import style from "@/styles/AdmStyle.module.css";
import styleMobile from "@/styles/HomeStyle.module.css"
import { useRouter } from "next/router";
import { deleteMyCart } from "@/services/cart.services";
import { useContext, useState } from "react";
import UserContext from "@/APIContext/UserContext";

export default function MyCartsSection({ info }: { info: any[] }) {
  console.log(info)

  return (
    <>
      <div className={style.cards}>
        {info.map((item, index) => (
          <CardUser info={item} key={index} />
        ))}
      </div>
      <div className={style.MymobileCard}>
        {info.map((item, index) => (
          <CardMobile info={item} key={index} />
        ))}
      </div>
    </>
  )
}

function CardUser({ info }: any) {
  const router = useRouter()

  const [formOn, setFormOn] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as any

  async function deleteMyCartPost() {
    try {
      await deleteMyCart(info.id, userData.token)
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <div onClick={() => router.push(`/admin/1`)} className={style.Mycard}>
      <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
      <div>
        <h1>{info.title}</h1>
        <p>{info.sections} eixos</p>
      </div>
      <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button onClick={() => setFormOn(!formOn)} className={style.update}>Atualizar</button>
      <button onClick={() => deleteMyCartPost()} className={style.delete}>Deletar</button>
    </div>
  )
}


function CardMobile({ info }: any) {
  const router = useRouter()

  const [formOn, setFormOn] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as any

  async function deleteMyCartPost() {
    try {
      await deleteMyCart(info.id, userData.token)
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <div onClick={() => router.push(`/locacoes/${2}`)} className={styleMobile.locationsCard}>
      <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
      <h2>{info.title}</h2>
      <p>{info.section} eixos</p>
      <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button> Teste</button>
    </div>
  )
}
