import { FormEvent, useState } from "react";
import style from "@/styles/LoginStyle.module.css";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";
import { ThreeDots } from "react-loader-spinner";
import { loginAdmin, signupAdmin } from "@/services/admin.services";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function SignupAdmin() {
  const router = useRouter()

  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<{ username: string, password: string, secret: string }>({ username: "", password: "", secret: ""})
  const [errorMessage, setErrorMessage] = useState<any>({ username: "Campo Obrigatório!", password: "Campo Obrigatório!", secret:"Campo Obrigatório" })
  const [fieldError, setFieldError] = useState(() => ({ username: false, password: false, secret: false }))

  async function signupAdminPost(e: FormEvent) {
    e.preventDefault()
    setDisable(true)

    try{
      await signupAdmin({username: informations.username, password: informations.password}, informations.secret)
      router.push("/admin/login")
    }catch(err: any) {
      const error = err as AxiosError
      if(error.response?.status === 400){
        setErrorMessage({...errorMessage, password: "Verifique os dados preenchidos"})
        setFieldError({...fieldError, password: true})
      }else if(error.response?.status === 401 ){
        setErrorMessage({...errorMessage, secret: err.response?.data.message})
        setFieldError({...fieldError, secret: true})
      }else if(error.response?.status === 409 ){
        setErrorMessage({...errorMessage, email: err.response?.data.message})
        setFieldError({...fieldError, username: true})
      }

      setDisable(false)
    }
  }

  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.background}>
        <h1 className={style.h1}>Cadastre como Administrador</h1>
        <form className={style.form} onSubmit={(e) => signupAdminPost(e)}>
          <p className={style.p2}>Email:</p>
          <input disabled={disable} className={style.input} value={informations.username} onChange={(e) => setInformations({ ...informations, username: e.target.value })} type="email" placeholder="Email" />
          {fieldError.username ? <p className={style.p}>{errorMessage.username}</p> : <div className={style.space}></div>}
          <p className={style.p2}>Senha:</p>
          <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />
          {fieldError.password ? <p className={style.p}>{errorMessage.password}</p> : <div className={style.space}></div>}
          <p className={style.p2}>Digite o PIN:</p>
          <input disabled={disable} className={style.input} value={informations.secret} onChange={(e) => setInformations({ ...informations, secret: e.target.value })} type="password" placeholder="PIN" />
          {fieldError.secret ? <p className={style.p}>{errorMessage.secret}</p> : <div className={style.space}></div>}

          <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Entrar"}</button>
        </form>
      </div>

      <Footer />
    </>
  )
}