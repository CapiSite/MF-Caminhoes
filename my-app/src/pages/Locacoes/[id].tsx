import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import Photos from "@/Components/Photos"
import Sidebar from "@/Components/Sidebar"
import style from "@/styles/LocationsById.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsWhatsapp } from "react-icons/bs"

const images = ["/caminhao.jpeg", "/banner-mobile.png", "/logo1.jpg","/caminhao.jpeg", "/banner-mobile.png", "/logo1.jpg"]


export default function ProductLocation() {

    const [mainImage, setMainImage] = useState(images[0])
    const route = useRouter()
    const {id} = route.query
  return (
   <>
    <div className={style.header}>
      <Header/>
    </div>
    <div className={style.sidebar}>
      <Sidebar/>
    </div>
    <div className={style.container}>
      <div className={style.images}>
        {images.map((o, i)=><Photos image={o} key={i} setMainImage={setMainImage}/>)}
      </div>
      <Image src={mainImage} alt="Caminhão" width={500} height={500}/>
      <div className={style.info}>
        <h1>Caminhão oasjflksadj lsjaflkasjf sladjflask</h1>
        <p>Detalhes do Veículo:</p>
        <div className={style.specifications}>
          <p>Tipo: Caminhão</p>
          <p>Marca: Bitrem</p>
          <p>Modelo: Caminhão</p>
          <p>Cor: Preto</p>
          <p>Ano: 2021</p>
          <p>Eixos: 3 eixos</p>
          <p>Status: Novo</p>
          <p>Observações: </p>
          <p>Descrição: </p>
        </div>
        <p>R$: 10.000,00</p>
        <Link href="https://web.whatsapp.com/send?phone=55349%209100-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es" target="_blank"><button>Fazer uma proposta<BsWhatsapp/></button></Link>
        
      </div>
      
    </div>
    
    <Footer/>
  </>
       
  )
}