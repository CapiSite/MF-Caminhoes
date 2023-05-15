import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import Photos from "@/Components/Photos"
import Sidebar from "@/Components/Sidebar"
import style from "@/styles/LocationsById.module.css"
import styleError from "@/styles/error.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"
import { BsWhatsapp } from "react-icons/bs"
import { getSpecificCart } from "@/services/cart.services"
import { roboto } from "@/styles/fonts"
import AdminContext from "@/APIContext/AdminContext"
import styleModal from "@/styles/user_page/user_update.module.css";


export default function ProductLocation() {
  
  const [deleter, setDeleter] = useState<any>(false)

  const {adminData} = useContext(AdminContext) as any
  const [error, setError] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const [mainImage, setMainImage] = useState("")
  const router = useRouter()
  const handleCall = useCallback(async () => {
        if (router.query.id === undefined) {
      setError(true)
    }

    if (typeof (router.query.id) === "string") {
      try {
        const infoReceived = await getSpecificCart(parseInt(router.query.id as string))
        setInfo(infoReceived)
        setMainImage(`/main/${infoReceived?.main_image}`)
      } catch (err: any) {
        setError(true)
      }
    }
  }, [router, useRouter])


  useEffect(() => {
    handleCall()
  }, [])


  if (error) {
    return (
      <>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={`${styleError.father} ${roboto.className}`}>
          <h1>Carreta não encontrada</h1>
          <h2>Por favor, tente mais tarde</h2>
          <button onClick={() => router.push("/locacoes")}>Voltar</button>
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>

      <div className={style.container}>
        <div className={style.allImages}>
        <div className={style.images}>
        <Image src={`/main/${info?.main_image}`} onClick={() => setMainImage(`/main/${info?.main_image}`)} alt="Caminhão" width={500} height={500} />
          {info ?
            info.cart_images.map((o: any, i: any) => <Photos image={`/secondary/${o.src}`} key={i} setMainImage={setMainImage} />)
            : null}
        </div>
        <Image src={mainImage} alt="Caminhão" width={500} height={500} />
        </div>
        <div className={style.info}>
          {info ?
            <>
              <h1>{info.title}</h1>
              <div className={style.specifications}>
                <p>Detalhes do Veículo:</p>
                <p>Tipo: {info.cart_type.name}</p>
                <p>Marca: {info.brands.name}</p>
                <p>Modelo: {info.cart_model.name}</p>
                <p>Tipo de Roda: {info.wheel.name}</p>
                <p>Cor: {info.color}</p>
                <p>Ano: 2021</p>
                <p>Eixos: {info.sections}</p>
                <p>Status: Novo</p>
                <p>Observações: {info.description}</p>
              </div>
              <p>R$: {parseFloat((info.price/100).toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2})}</p>
              <Link href={`https://api.whatsapp.com/send?phone=5534992771000&text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atr%C3%A1ves%20do%20site%20LocaAqui!%20Quero%20saber%20a%20respeito%20da%20carreta:%20https://locaaqui.com/locacoes/${router.query.id}`} target="_blank"><button >Fazer uma proposta<BsWhatsapp /></button></Link>
              {adminData ?<div className={style.delete}><button  onClick={() => setDeleter(true)}>Deletar carreta</button></div>:<></>}
              {deleter &&
        <div className={styleModal.modal}>
          <h1>Deseja mesmo deletar essa carreta?</h1>
          <p>Essa carreta será excluída!</p>
          <div className={styleModal.buttons}>
            <button onClick={() => setDeleter(false)}>Não</button>
            <button onClick={() => {}/* DELETA AQUI A CARRETA! */}>Sim</button>
          </div>
        </div>}
            </>
            : null}
        </div>

      </div>
      <Footer />
    </>

  )
}