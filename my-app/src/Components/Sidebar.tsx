import Image from "next/image"
import style from "../styles/SideStyle.module.css"
import { useRouter } from "next/router"
import Logo from "../../public/LogoLocacao.png"
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";

export default function Sidebar() {
    const [disabled, setDisabled] = useState(true)
    const router = useRouter()
    return (
        <>
        <header className={style.header}>
            <div >
                <div onClick={()=>setDisabled(false)}>
                <VscThreeBars/>
                </div>
            <Image onClick={()=> router.push("/")}className={style.logo} src={Logo} width={200} height={150} alt='Logo'/>
            </div>
        </header>
        {disabled?(<></>):(<aside className={style.aside}>
            <div>
            <button onClick={()=> router.push("/locacoes")}className={style.options}>Locar</button>
            <button onClick={()=> router.push("/comprar")}className={style.options}>Comprar</button>
            <button onClick={()=> router.push("/comprar")}className={style.options}>Loque sua carreta</button>
            </div>
            <div>
            <button onClick={()=> router.push("/login")}className={style.options}>Entrar</button> 
            <button onClick={()=> router.push("/cadastrar")}className={style.register}>Cadastre-se</button>
            </div>
        </aside>)}
        
        {/*  */}
        </>
         
    )
}