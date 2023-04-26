import Image from "next/image"
import style from "../styles/FooterStyle.module.css"
import { useRouter } from "next/router"
import Logo from "@/../public/LogoLocacao.png"
import { BiRegistered } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { BsFacebook } from "react-icons/bs";

export default function Footer() {
    const router = useRouter()
    return (
        <footer className={style.footer}>
      <Image className={style.logo} src={Logo} width={300} height={200} alt='Logo'/>
      <div className={style.informations}>
        <h1>
          MF Locações
        </h1>
        <p className={style.contact}>Contato:</p>
        <div className={style.numbers}>
          <a target="_blank"href='https://web.whatsapp.com/send?phone=55349%209100-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es.'>(34) 9 9100-1000</a>
          <a target="_blank"href='https://web.whatsapp.com/send?phone=553499274-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es.'>(34) 9 9274-1000</a>
        </div>
        <p className={style.address}>Rua Bernardo Sayão, 181, Custódio Pereira
UBERLANDIA/MINAS GERAIS 38405-234</p>
        <div className={style.ion}>
          <BiRegistered/>
          <span className={style.span}> 2023 MF Caminhões</span>
        </div>
      </div>
      <div className={style.schedules}>
      <h1>
          Horários
        </h1>
        <p>Segunda a Sexta de 08:00 às 18:00</p>
        <div>
          <a target="_blank"href='https://www.instagram.com/mfcaminhoes/'>
          <GrInstagram/>
          </a>
          <a target="_blank"href='https://www.facebook.com/mf.caminhoes.58'><BsFacebook/></a>
          
        </div>
      </div>
      </footer>
         
    )
  }