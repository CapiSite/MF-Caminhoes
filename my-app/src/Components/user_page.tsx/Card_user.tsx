import Image from "next/image";
import style from "@/styles/AdmStyle.module.css";
import styleMobile from "@/styles/HomeStyle.module.css"
import { useRouter } from "next/router";
import { deleteMyCart } from "@/services/cart.services";
import { useContext, useState } from "react";
import UserContext from "@/APIContext/UserContext";
import styleModal from "@/styles/user_page/user_update.module.css";

export default function MyCartsSection({ info }: { info: any }) {
  const [deleter, setDeleter] = useState<any>(false)
  const { userData } = useContext(UserContext) as any
  async function deleteMyCartPost() {
    try {
      await deleteMyCart(info.id, userData.token)
    } catch (err: any) {
      console.log(err)
    }
  }
  return (
    <>
      {deleter &&
           <div className={styleModal.modal}>
            <h1>Deseja mesmo deletar sua carreta?</h1>
            <p>Sua carreta será excluída, você terá que solicitar novamente a aprovação de sua carreta caso queria cadastrá-la novamente</p>
            <div className={styleModal.buttons}>
              <button onClick={() => setDeleter(false)}>Não</button>
              <button onClick={() => deleteMyCartPost()}>Sim</button>
            </div>
            
          </div>}
      <div className={style.cards}>
        {info.map((item:any, index:any) => (
          <CardUser info={item} setDeleter={setDeleter} key={index} />
        ))}
      </div>
      <div className={style.MymobileCard}>
        {info.map((item:any, index:any) => (
          <CardMobile info={item} setDeleter={setDeleter} key={index} />
        ))}
      </div>
    </>
  )
}

function CardUser({ info, setDeleter }: any) {

  const [formOn, setFormOn] = useState<boolean>(false)

  return (
    <div className={style.Mycard}>
      <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
      <div>
        <h1>{info.title}</h1>
        <p>{info.sections} eixos</p>
      </div>
      <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button onClick={() => setFormOn(!formOn)} className={style.update}>Atualizar</button>
      <button onClick={() => setDeleter(true)} className={style.delete}>Deletar</button>
    </div>
  )
}


function CardMobile({ info, setDeleter }: any) {
  const [formOn, setFormOn] = useState<boolean>(false)


  return (
    <div className={styleMobile.locationsCardPersonal}>
      <Image src={"/caminhao.jpeg"} alt="Caminhão" width={198} height={198} />
      <h2>{info.title}</h2>
      <p>{info.sections} eixos</p>
      <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
      <button onClick={() => setFormOn(!formOn)} className={styleMobile.update}>Atualizar</button>
      <button onClick={() => setDeleter(true)} className={styleMobile.delete}>Deletar</button>
    </div>
  

  )
}
