import Image from "next/image"
import style from "../styles/HeaderStyle.module.css"
import { useRouter } from "next/router"
import Logo from "../../public/LogoLocacao.png"

export default function Header() {
  const router = useRouter()

  return (
    <header className={style.header}>
      <div >
        <Image onClick={() => router.push("/")} className={style.logo} src={Logo} width={190} height={61} alt='Logo' />
        <button onClick={() => router.push("/locacoes")} className={style.options}>Locar</button>
        <button onClick={() => router.push("/comprar")} className={style.options}>Comprar</button>
        <button onClick={() => router.push("/perfil")} className={style.options}>Loque sua carreta</button>
      </div>
      <div>
        <button onClick={() => router.push("/login")} className={style.options}>Entrar</button>
        <button onClick={() => router.push("/cadastrar")} className={style.register}>Cadastre-se</button>
      </div>
    </header>
  )
}