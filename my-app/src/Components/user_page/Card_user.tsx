import Image from "next/image";
import style from "@/styles/AdmStyle.module.css";
import styleMobile from "@/styles/HomeStyle.module.css"
import { confirmSawAllDeletedCarts, deleteMyCart } from "@/services/cart.services";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/APIContext/UserContext";
import styleModal from "@/styles/user_page/user_update.module.css";
import OptionContext from "@/APIContext/UserOption";
import { useRouter } from "next/router";

export default function MyCartsSection({ info, change, type }: { info: any, change: { render: any, setRender: any, }, type: number }) {

  const { userData } = useContext(UserContext) as any
  const { setOptionData } = useContext(OptionContext) as any

  async function deleteMyCartPost(id: number) {
    try {
      await deleteMyCart(id, userData.token)
      change.setRender(!change.render)
    } catch (err: any) {
    }
  }

  async function confirmSawCart() {
    try {
      await confirmSawAllDeletedCarts(userData.token)
      change.setRender(!change.render)
    } catch (err: any) {
    }
  }


  if (info[0] === "nothing") {
    return (
      <div className={style.cards}>
      </div>
    )
  }

  if (type === 0) {
    return (
      <>
        {info.length > 0 ?
          <>
            <div className={style.cards}>
              {info.map((item: any, index: any) => (
                <CardUser info={item} key={index} deleteMyCartPost={deleteMyCartPost} />
              ))}
            </div>
            <div className={style.MymobileCard}>
              {info.map((item: any, index: any) => (
                <CardMobile info={item} key={index} deleteMyCartPost={deleteMyCartPost} />
              ))}
            </div>
          </>
          : info ?
          <div className={styleMobile.notFound}>
            <p>Você ainda não locou nenhuma carreta</p>
            <button onClick={() => setOptionData(0)}>Locar uma carreta</button>

          </div>: null
          }

      </>
    )
  }
  else {
    return (
      <div className={styleMobile.myDeleteCarts}>
        <div className={styleMobile.text}>
          <p>Lista de carretas recusadas</p>
          <button onClick={() => confirmSawCart()}>Limpar lista</button>
        </div>

        <div className={style.cards}>
          {info.map((item: any, index: any) => (
            <CardUserRefused info={item} key={index} />
          ))}
        </div>
        <div className={style.MymobileCard}>
          {info.map((item: any, index: any) => (
            <CardMobileRefused info={item} key={index} />
          ))}
        </div>
      </div>
    )
  }
}

function CardUser({ info, deleteMyCartPost }: any) {
  const [deleter, setDeleter] = useState<any>(false)
  const router = useRouter()
  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${info.main_image}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl);
        setRender(true)
      })
      .catch(() =>{
        setRender(true)
      })
  }, [])

  if (!render) {
    return (
      <div className={style.modal}>
      </div>
    )
  }

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
        <Image src={src} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={198} height={198} />
        <div>
          <h1>{info.title}</h1>
          <p>{info.sections} eixos</p>
        </div>
        <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
        <button onClick={() => router.push(`/locacoes/${info.id}`)} disabled={info.valid ? false : true} className={style.seeMore}>{info.valid ? "Ver mais" : "Em análise"}</button>
        <button onClick={() => setDeleter(true)} className={style.delete}>Deletar</button>


      </div>
    </>
  )
}


function CardMobile({ info, deleteMyCartPost }: any) {
  const [deleter, setDeleter] = useState<any>(false)
  const router = useRouter()
  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${info.main_image}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl);
        setRender(true)
      })
      .catch(() =>{
        setRender(true)
      })
  }, [])

  if (!render) {
    return (
      <div className={style.modal}>
      </div>
    )
  }

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
        <Image src={src} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={198} height={198} />
        <h2>{info.title}</h2>
        <p>{info.sections} eixos</p>
        <p>R${parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
        <button onClick={() => router.push(`/locacoes/${info.id}`)} disabled={info.valid ? false : true} className={styleMobile.seeMore}>{info.valid ? "Ver mais" : "Em análise"}</button>
        <button onClick={() => setDeleter(true)} className={styleMobile.delete}>Deletar</button>

      </div>
    </>
  )
}



function CardUserRefused({ info }: any) {
  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${info.main_image}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl);
        setRender(true)
      })
      .catch(() =>{
        setRender(true)
      })
  }, [])

  if (!render) {
    return (
      <div className={style.Mycard}>
      </div>
    )
  }

  return (
    <>
      <div className={style.Mycard}>
        <Image src={src} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={198} height={198} />
        <div>
          <h1>{info.title}</h1>
        </div>
      </div>
    </>
  )
}


function CardMobileRefused({ info }: any) {
  const [src, setSrc] = useState("")
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${info.main_image}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setSrc(imageUrl);
        setRender(true)
      })
      .catch(() =>{
        setRender(true)
      })
  }, [])

  if (!render) {
    return (
      <div className={style.locationsCardPersonal}>
      </div>
    )
  }

  return (
    <>
      <div className={styleMobile.locationsCardPersonal}>
        <Image src={src} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={198} height={198} />
        <h2>{info.title}</h2>
      </div>
    </>
  )
}
