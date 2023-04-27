import Image from "next/image"
import style from "../styles/SideStyle.module.css"
import { useRouter } from "next/router"
import Logo from "../../public/LogoLocacao.png"
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion"
import { initialize } from "next/dist/server/lib/render-server";

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
    duration: 0.3
  }


  return (
    <>
      <header className={style.header}>
        <div >
          <div onClick={() => setDisabled(false)}>
            <VscThreeBars />
          </div>
          <Image onClick={() => router.push("/")} className={style.logo} src={Logo} width={200} height={150} alt='Logo' />
        </div>
      </header>

      <AnimatePresence>

        {disabled ? null : (
          <motion.aside initial={initial} animate={animate} exit={initial} transition={transition} className={style.aside}>
            <header>
              <Image src={Logo} alt="sidebar-logo" width={200} />

              <section onClick={() => setDisabled(true)}>
                <IoMdArrowRoundBack />
              </section>

            </header>

            <div>
              <button onClick={() => router.push("/locacoes")} className={style.options}>Locar</button>
              <button onClick={() => router.push("/comprar")} className={style.options}>Comprar</button>
              <button onClick={() => router.push("/comprar")} className={style.options}>Loque sua carreta</button>
            </div>

            <div>
              <button onClick={() => router.push("/login")} className={style.options}>Entrar</button>
              <button onClick={() => router.push("/cadastrar")} className={style.register}>Cadastre-se</button>
            </div>
          </motion.aside>

        )}

      </AnimatePresence>

      {/*  */}
    </>
  )
}