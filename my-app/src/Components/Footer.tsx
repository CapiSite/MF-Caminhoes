import Image from "next/image";
import style from "../styles/FooterStyle.module.css";
import { useRouter } from "next/router";
import Logo from "@/../public/LogoLocacao.png";
import { BiRegistered } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <footer className={style.footer}>
        <Image
          className={style.logo}
          src={Logo}
          width={267}
          height={88}
          alt="Logo"
        />
        <div className={style.informations}>
          <h1>MF Locações</h1>
          <p className={style.contact}>Contatos:</p>
          <div className={style.numbers}>
            <Link
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5534991001000&text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atr%C3%A1ves%20do%20site%20LocaAqui!
"
            >
              (34) 9 9100-1000
            </Link>
            <Link
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5534993011000&text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atr%C3%A1ves%20do%20site%20LocaAqui!
"
            >
              (34) 9 9301-1000
            </Link>
          </div>
          <p className={style.address}>
            Rua Bernardo Sayão, 247, Custódio Pereira UBERLANDIA/MINAS GERAIS
            38405-234
          </p>
        </div>
        <div className={style.schedules}>
          <h1>Horários</h1>
          <p>Segunda a Sexta de 08:00 às 18:00</p>
          <div>
            <Link target="_blank" href="https://www.instagram.com/mfcaminhoes/">
              <GrInstagram />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/mf.caminhoes.58">
              <BsFacebook />
            </Link>
          </div>
          <div className={style.ion}>
            <BiRegistered />
            <span className={style.span}> 2023 LocaAqui</span>
          </div>
        </div>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
