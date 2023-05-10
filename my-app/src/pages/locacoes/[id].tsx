import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import Photos from "@/Components/Photos"
import Sidebar from "@/Components/Sidebar"
import style from "@/styles/LocationsById.module.css"
import styleError from "@/styles/error.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { BsWhatsapp } from "react-icons/bs"
import { getSpecificCart } from "@/services/cart.services"
import { roboto } from "@/styles/fonts"

export default function ProductLocation() {
  const router = useRouter()

  
  const [error, setError] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()
  const [mainImage, setMainImage] = useState("")
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
  }, [])


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
        <div className={style.images}>
        <Image src={`/main/${info?.main_image}`} onClick={() => setMainImage(`/main/${info?.main_image}`)} alt="Caminhão" width={500} height={500} />
          {info ?
            info.cart_images.map((o: any, i: any) => <Photos image={`/secondary/${o.src}`} key={i} setMainImage={setMainImage} />)
            : null}
        </div>
        <Image src={mainImage} alt="Caminhão" width={500} height={500} />
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
              <Link href="https://web.whatsapp.com/send?phone=55349%209100-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es" target="_blank"><button>Fazer uma proposta<BsWhatsapp /></button></Link>
            </>
            : null}
        </div>

      </div>
      <Footer />
    </>

  )
}