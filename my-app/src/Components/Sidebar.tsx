import Image from "next/image"
import style from "../styles/SideStyle.module.css"
import { useRouter } from "next/router"
import Logo from "../../public/LogoLocacaoSemFundo.png"
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion"
import { initialize } from "next/dist/server/lib/render-server";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

export default function Sidebar() {
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()

  const initial = {
    x: -400
  }

  const animate = {
    x: 0
  }

  const transition = {
    duration: 0.5
  }


  return (
    <>
      <header className={style.header}>
        <div >
          <div onClick={() => setDisabled(false)}>
            <VscThreeBars />
          </div>
          <Image onClick={() => router.push("/")} className={style.logo} src={Logo} width={267} height={88} alt='Logo' />
        </div>
      </header>

      <AnimatePresence>

        {disabled ? null : (
          <motion.aside initial={initial} animate={animate} exit={initial} transition={transition} className={style.aside}>

            <section onClick={() => setDisabled(true)}>
              <IoMdArrowRoundBack />
            </section>

            <div>
              <button onClick={() => router.push("/locacoes")} className={style.options}>Locar</button>
              <button onClick={() => router.push("/comprar")} className={style.options}>Comprar</button>
              <button onClick={() => router.push("/comprar")} className={style.options}>Loque sua carreta</button>
            </div>

            <div>
              <button onClick={() => router.push("/login")} className={style.options}>Entrar</button>
              <button onClick={() => router.push("/cadastrar")} className={style.register}>Cadastre-se</button>
            </div>

            <footer className={style.img}>
              <Image  src={Logo} alt="sidebar-logo" width={200} />
            </footer>
          </motion.aside>

        )}

      </AnimatePresence>

      {/*  */}
      <div className={style.button}>
      <Link href="https://web.whatsapp.com/send?phone=55349%209100-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es" target="_blank"><button><BsWhatsapp /></button></Link>
      </div>
    </>
  )
}