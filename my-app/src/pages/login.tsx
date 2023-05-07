import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/LoginStyle.module.css";
import Sidebar from "@/Components/Sidebar";
import {FormEvent, useState, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "@/hooks/a";


export default function Login() {

  const router = useRouter()
  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<any>({email: "", password: ""})
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false}))
  useEffect(() => {
    ///Rodrigo, não permita que a pessoa acesse essa página caso ela esteja logada!!


    return
  },[])
  return (
   <>
          <div className={style.header}>
        <Header/>
      </div>
      <div className={style.sidebar}>
        <Sidebar/>
      </div>
            <div className={style.background}>
            <h1 className={style.h1}>Entre na sua conta</h1>
                <form className={style.form} onSubmit={login}>
                    {fieldError.email && <p className={style.p}>{errorMessage.email}</p>}
                    <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({...informations, email: e.target.value})} type="email" placeholder="Email" />
                    {fieldError.password && <p className={style.p}>{errorMessage.password}</p>}
                    <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({...informations, password: e.target.value})} type="password" placeholder="Senha" />
                    <button disabled={disable} className={style.button} type="submit">{disable?<ThreeDots color="white"/>:"Entrar"}</button>
                    {ActiveLink({children: "Não possui uma conta? Cadastre-se!", href: "/cadastrar"})}
                </form>
            </div>
          <Footer />
    </>
  )
  function login(e : FormEvent){
    e.preventDefault()
    setDisable(true)
    const fields = ["email", "password"]
    let newFieldError:any = {email: false, password: false};
    for (let item of fields) {
        if (!informations[item]) {
            newFieldError = { ...newFieldError, [item]: true };
        } else {
            newFieldError = { ...newFieldError, [item]: false };
        }
    }
    let foundError;
    for (let item of fields) {
        foundError = newFieldError[item] === true
    }
    if (foundError) {
        setDisable(false)
        setFieldError(newFieldError)
        return
    }

    ///RODRIGO, LINKA COM O SERVIDOR AQUI, PARA ENVIAR OS DADOS!!
    ///Váriavel com os itens para fazer login é a "login"
  }
}