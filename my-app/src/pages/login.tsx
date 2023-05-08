import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/LoginStyle.module.css";
import Sidebar from "@/Components/Sidebar";
import { FormEvent, useState, useContext, } from "react"
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import ActiveLink from "@/hooks/a";
import UserContext from "@/APIContext/UserContext";
import { loginUser } from "@/services/user-services";

export default function Login() {
  const router = useRouter()
  
  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<{ email: string, password: string }>({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false }))

  const { userData, setUserData } = useContext(UserContext) as any


  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.background}>
        <h1 className={style.h1}>Entre na sua conta</h1>
        <form className={style.form} onSubmit={login}>
          {fieldError.email && <p className={style.p}>{errorMessage.email}</p>}
          <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({ ...informations, email: e.target.value })} type="email" placeholder="Email" />
          {fieldError.password && <p className={style.p}>{errorMessage.password}</p>}
          <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />
          <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Entrar"}</button>
          {ActiveLink({ children: "Não possui uma conta? Cadastre-se!", href: "/cadastrar" })}
        </form>
      </div>
      <Footer />
    </>
  )

  async function login(e: FormEvent) {
    e.preventDefault()
    setDisable(true)

    const fields = ["email", "password"]
    let newFieldError: any = { email: false, password: false };

    if (!informations.email) {
      newFieldError = { ...newFieldError, email: true };
    } else if (!informations.password){
      newFieldError = { ...newFieldError, password: false };
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

    try {
      const tokenAndUser = await loginUser(informations)
      console.log(tokenAndUser)
      setUserData(tokenAndUser)
      console.log("aq")
      router.push("/")
    } catch (err) {
      setDisable(true)
    }
  }
}