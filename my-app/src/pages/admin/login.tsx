import { FormEvent, useContext, useState } from "react";
import style from "@/styles/LoginStyle.module.css";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";
import { ThreeDots } from "react-loader-spinner";
import { loginAdmin, signupAdmin } from "@/services/admin.services";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import UserContext from "@/APIContext/UserContext";
import AdminContext from "@/APIContext/AdminContext";

export default function loginAdminForm() {
  const router = useRouter()

  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<{ username: string, password: string }>({ username: "", password: ""})
  const [errorMessage, setErrorMessage] = useState<any>({ username: "Campo Obrigatório!", password: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ username: false, password: false }))

  const { setUserData } = useContext(UserContext) as {userData: any, setUserData: any}
  const { setAdminData } = useContext(AdminContext) as {adminData: any, setAdminData: any}

  async function loginPost(e: FormEvent) {
    e.preventDefault()

    setDisable(true)

    try{
      const admin = await loginAdmin(informations)
      setUserData(null)
      setAdminData(admin)

      router.push("/admin")
    }catch(err: any) {
      const error = err as AxiosError
      console.log(err)
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
        <h1 className={style.h1}>Entre na sua conta</h1>
        <form className={style.form} onSubmit={(e) => loginPost(e)}>

          {fieldError.username && <p className={style.p}>{errorMessage.username}</p>}
          <input disabled={disable} className={style.input} value={informations.username} onChange={(e) => setInformations({ ...informations, username: e.target.value })} type="email" placeholder="Email" />

          {fieldError.password && <p className={style.p}>{errorMessage.password}</p>}
          <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />

          <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Entrar"}</button>
        </form>
      </div>

      <Footer />
    </>
  )
}