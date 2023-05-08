import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import Photos from "@/Components/Photos"
import Sidebar from "@/Components/Sidebar"
import style from "@/styles/LocationsById.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { BsWhatsapp } from "react-icons/bs"
import { useParams } from 'next/navigation';
import { getSpecificCart } from "@/services/cart.services"

export default function ProductLocation() {
  const router = useRouter()

  const [info, setInfo] = useState<any>()

  const handleCall = useCallback(async () => {
    try {
      const infoReceived = await getSpecificCart(Number(router.query.id))
      console.log(infoReceived)
      setInfo(infoReceived)
    } catch (err: any) { }
  }, [])


  useEffect(() => {
    handleCall()
  }, [])

  const [mainImage, setMainImage] = useState()
  const route = useRouter()

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
          {info ?
            info.cart_images.map((o : any, i : any)=> <Photos image={`/secondary/${o.src}`} key={i} setMainImage={setMainImage} />)
            : null}
        </div>
        <Image src={`/main/${info?.main_image}`} alt="Caminhão" width={500} height={500} />
        <div className={style.info}>
          <h1>{info.title}</h1>
          <div className={style.specifications}>
            <p>Detalhes do Veículo:</p>
            <p>Tipo: {info.cart_type.name}</p>
            <p>Marca: {info.brands.name}</p>
            <p>Modelo: {info.cart_model.name}</p>
            <p>Tipo de Roda: {info.wheel.name}</p>
            <p>Cor: {info.color}</p>
            <p>Ano: 2021</p>
            <p>Eixos: 3 eixos</p>
            <p>Status: Novo</p>
            <p>Observações: </p>
            <p>Descrição: {info.description} </p>
          </div>
          <p>R$: 10.000,00</p>
          <Link href="https://web.whatsapp.com/send?phone=55349%209100-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es" target="_blank"><button>Fazer uma proposta<BsWhatsapp /></button></Link>

        </div>

      </div>

      <Footer />
    </>

  )
}