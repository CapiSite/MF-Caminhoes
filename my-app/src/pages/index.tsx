import Image from 'next/image'
import Logo from "@/../public/LogoLocacao.png"
import Banner from "@/../public/banner2.jpg"
import style from "../styles/HomeStyle.module.css"
import logo from "@/../public/Logo.png"
import { useRouter } from 'next/router'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'


export default function Home() {

  const router = useRouter()
  return (
    <div>
      <Header/>
      <main className={style.main}>
        <div className={style.center}>
        <Image className={style.banner} src={Banner} alt="Banner"/>
        <div className={style.buttons}>
          <button onClick={()=> router.push("/locacoes")}className={style.button}>
            <Image src={Logo} width={250} height={150} alt='Logo'/>
            <p>Locação</p>
            </button>
          <button onClick={()=> router.push("/comprar")}className={style.button}>
          <Image className={style.logo2} src={logo} width={350} height={60} alt='Logo'/>
          <p className={style.p}>Compra</p>
          </button>
        </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
