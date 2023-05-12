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
import { AiOutlineClose } from "react-icons/ai";
import AdminContext from "@/APIContext/AdminContext";

export default function Login() {
  const router = useRouter()

  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<{ email: string, password: string }>({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false }))

  const { setUserData } = useContext(UserContext) as any
  const { setAdminData } = useContext(AdminContext) as any
  const [admin, setAdmin] = useState<boolean>(false)

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
        <form className={style.form} onSubmit={(e) => login(e)}>
          <p className={style.p2}>Email:</p>
          <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({ ...informations, email: e.target.value })} type="email" placeholder="Email" />
          {fieldError.email ? <p className={style.p}>{errorMessage.email}</p>:<div className={style.space}></div>}
          <p className={style.p2}>Senha:</p>
          <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />
          {fieldError.password ? <p className={style.p}>{errorMessage.password}</p>:<div className={style.space}></div>}
          <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Entrar"}</button>
          {ActiveLink({ children: "Não possui uma conta? Cadastre-se!", href: "/cadastrar" })}
        </form>
        {admin && <div className={style.admin}>
          <h1>Insira o PIN para entrar</h1>
          <input placeholder="Insira o PIN" />
          <button onClick={() => router.push("/locacoes")}>Acessar</button>
          <AiOutlineClose onClick={() => setAdmin(!admin)} />
        </div>}
      </div>

      <Footer />
    </>
  )

  async function login(e: FormEvent) {
    e.preventDefault()
    setDisable(true)
    let error = { email: "", password: "" }
    const fields = ["email", "password"]
    let newFieldError: any = { email: false, password: false };
    if(informations.email.includes(".") === false){
      setDisable(false)
      newFieldError = { ...newFieldError, email: true };
      error = { ...error, email: "Email inválido!" }
    }
    if (!informations.email) {
      newFieldError = { ...newFieldError, email: true };
      error = {...error, email: "Campo Obrigatório!"}
    }
    
    if (!informations.password) {
      newFieldError = { ...newFieldError, password: true };
      error = {...error, password: "Campo Obrigatório!"}
    }

    if (informations.password.length>100) {
      newFieldError = { ...newFieldError, password: true };
      error = {...error, password: "Insira menos de 100 caracteres"}
    }
    if (informations.email.length>100) {
      newFieldError = { ...newFieldError, password: true };
      error = {...error, email: "Insira menos de 100 caracteres"}
    }
    let foundError;
    for (let item of fields) {
      foundError = newFieldError[item] === true
    }
    if (foundError) {
      setDisable(false)
      setFieldError(newFieldError)
      setErrorMessage(error)
      return
    }

    try {
      const tokenAndUser = await loginUser(informations)
      setUserData(tokenAndUser)
      setAdminData(null)
      router.push("/")
    } catch (err) {
      console.log(err)
      setDisable(false)
    }
  }
}