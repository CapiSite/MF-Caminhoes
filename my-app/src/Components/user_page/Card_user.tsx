import Image from "next/image";
import style from "@/styles/AdmStyle.module.css";
import styleMobile from "@/styles/HomeStyle.module.css"
import { confirmSawAllDeletedCarts, deleteMyCart } from "@/services/cart.services";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/APIContext/UserContext";
import styleModal from "@/styles/user_page/user_update.module.css";

export default function MyCartsSection({ info, change, type }: { info: any, change: {render: any, setRender: any,},  type: number }) {
  const { userData } = useContext(UserContext) as any

  console.log(type)


  async function deleteMyCartPost(id: number) {
    try {
      await deleteMyCart(id, userData.token)
      change.setRender(!change.render)
    } catch (err: any) {
      console.log(err)
    }
  }

  async function confirmSawCart() {
    try {
      await confirmSawAllDeletedCarts(userData.token)
      change.setRender(!change.render)
    } catch (err: any) {
      console.log(err)
    }
  }

  if(type === 0) {
    return (
      <>
        <div className={style.cards}>
          {info.map((item: any, index: any) => (
            <CardUser info={item} key={index} deleteMyCartPost={deleteMyCartPost}/>
          ))}
        </div>
        <div className={style.MymobileCard}>
          {info.map((item: any, index: any) => (
            <CardMobile info={item} key={index} deleteMyCartPost={deleteMyCartPost}/>
          ))}
        </div>
      </>
    )
  }
  else{
    return (
      <>
        <button onClick={() => confirmSawCart()}>Atualizar</button>
        <div className={style.cards}>
          {info.map((item: any, index: any) => (
            <CardUserRefused info={item} key={index}/>
          ))}
        </div>
        <div className={style.MymobileCard}>
          {info.map((item: any, index: any) => (
            <CardMobileRefused info={item} key={index}/>
          ))}
        </div>
      </>
    )
  }  
}

function CardUser({ info, deleteMyCartPost }: any) {
  const [deleter, setDeleter] = useState<any>(false)
  const [formOn, setFormOn] = useState<boolean>(false)

  return (
    <>
      {deleter &&
        <div className={styleModal.modal}>
          <h1>Deseja mesmo deletar sua carreta?</h1>
          <p>Sua carreta será excluída, você terá que solicitar novamente a aprovação de sua carreta caso queria cadastrá-la novamente</p>
          <div className={styleModal.buttons}>
            <button onClick={() => setDeleter(false)}>Não</button>
            <button onClick={() => deleteMyCartPost(info.id)}>Sim</button>
          </div>

        </div>}
      <div className={style.Mycard}>
        <Image src={`/main/${info.main_image}`} alt="Caminhão" width={198} height={198} />
        <div>
          <h1>{info.title}</h1>
          <p>{info.sections} eixos</p>
        </div>
        <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
        <button onClick={() => setFormOn(!formOn)} className={style.update}>Atualizar</button>
        <button onClick={() => setDeleter(true)} className={style.delete}>Deletar</button>
      </div>
    </>
  )
}


function CardMobile({ info, deleteMyCartPost }: any) {
  const [deleter, setDeleter] = useState<any>(false)
  const [formOn, setFormOn] = useState<boolean>(false)

  return (
    <>
      {deleter &&
        <div className={styleModal.modal}>
          <h1>Deseja mesmo deletar sua carreta?</h1>
          <p>Sua carreta será excluída, você terá que solicitar novamente a aprovação de sua carreta caso queria cadastrá-la novamente</p>
          <div className={styleModal.buttons}>
            <button onClick={() => setDeleter(false)}>Não</button>
            <button onClick={() => deleteMyCartPost(info.id)}>Sim</button>
          </div>

        </div>}

      <div className={styleMobile.locationsCardPersonal}>
        <Image src={`/main/${info.main_image}`} alt="Caminhão" width={198} height={198} />
        <h2>{info.title}</h2>
        <p>{info.sections} eixos</p>
        <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
        <button onClick={() => setFormOn(!formOn)} className={styleMobile.update}>Atualizar</button>
        <button onClick={() => setDeleter(true)} className={styleMobile.delete}>Deletar</button>
      </div>
    </>
  )
}



function CardUserRefused({ info }: any) {
  return (
    <>
      <div className={style.Mycard}>
        <Image src={`/main/${info.main_image}`} alt="Caminhão" width={198} height={198} />
        <div>
          <h1>{info.title}</h1>
        </div>
      </div>
    </>
  )
}


function CardMobileRefused({ info }: any) {
  return (
    <>
      <div className={styleMobile.locationsCardPersonal}>
        <Image src={`/main/${info.main_image}`} alt="Caminhão" width={198} height={198} />
        <h2>{info.title}</h2>
      </div>
    </>
  )
}
