import Image from "next/image"
import style from "../styles/SideStyle.module.css"
import { useRouter } from "next/router"
import Logo from "../../public/LogoLocacao.png"
import { VscThreeBars } from "react-icons/vsc";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import UserContext from "@/APIContext/UserContext";
import { verifyToken } from "@/services/user-services";

export default function Sidebar({changeToUser} : any) {
  const [disabled, setDisabled] = useState(true)
  const { userData, setUserData } = useContext(UserContext) as any 
  const [userInfo, setUserinfo] = useState<boolean>(false)
  const [ userName, setUserName] = useState<any>()
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


  const handleCallUser = useCallback(async () => {  
    try {
      await verifyToken(userData.token)
      setUserinfo(userData)
    } catch (err: any) {
      setUserData(null)
    }
  }, [])

  useEffect(() => {
    if (userData) {
      handleCallUser()
      setUserinfo(true)
      setUserName(userData)
      
    }else{
      setUserinfo(false)
    }
  }, [])


  return (
    <>
      <header className={style.header}>
        <div >
          <div onClick={() => setDisabled(false)}>
            <VscThreeBars />
          </div>
          <Image onClick={() => router.push("/")} className={style.logo} src={Logo} width={180} height={88} alt='Logo' />
        </div>
      </header>

      <AnimatePresence>

        {disabled ? null : (
          <motion.aside initial={initial} animate={animate} exit={initial} transition={transition} className={style.aside}>

            <section onClick={() => setDisabled(true)}>
              <IoMdArrowRoundBack />
            </section>
            {!userInfo?<div className={style.logoSide}>
            <Image src={Logo} alt="sidebar-logo" width={250} />
            </div>:
            <div className={style.userImage} onClick={() =>{ router.push("/perfil"); if(changeToUser){ changeToUser(2)}}}>
              
              <Image src="/default_photo.png" width={35} height={30} alt="foto de usuário" />
              <p>{userName.user.name}</p>
            </div>
            }
            <div>
              <button onClick={() => router.push("/locacoes")} className={style.options}>Locar</button>
            </div>
            {userInfo ? <button
                onClick={() => router.push("/login")}
                className={style.options}
              >
                Anuncie Aqui
              </button>:<></>}
          {!userInfo?<div>

              <button onClick={() => router.push("/cadastrar")} className={style.register}>Anuncie aqui</button>
            </div>:<></>}
            {userInfo?
            <footer className={style.img}>
              <Image src={Logo} alt="sidebar-logo" width={250} />
            </footer>  
          :<></>}
            
          </motion.aside>

        )}

      </AnimatePresence>

      {/*  */}
      <div className={style.button}>
      <Link href="https://api.whatsapp.com/send?phone=5534992771000&text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atr%C3%A1ves%20do%20site%20LocaAqui!
" target="_blank"><button><BsWhatsapp /></button></Link>
      </div>
    </>
  )
}