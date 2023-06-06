import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/LoginStyle.module.css";
import Sidebar from "@/Components/Sidebar";
import { FormEvent, useState, useContext, useEffect, } from "react"
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import ActiveLink from "@/hooks/a";
import UserContext from "@/APIContext/UserContext";
import { forgotPasswordPost, loginUser } from "@/services/user-services";
import AdminContext from "@/APIContext/AdminContext";
import { toast } from "react-toastify";
import { sendCode, sendEmail } from "@/services/email.service";
import { userInfo } from "os";

export default function Login() {
  const router = useRouter()
  const [forgotEmail, setForgotEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState({password: "", confirmPassword: ""})
  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<{ email: string, password: string }>({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false }))
  const [messageError, setMessageErro] = useState("")
  const { userData,setUserData } = useContext(UserContext) as any
  const { setAdminData } = useContext(AdminContext) as any
  const [forgot, setForgot] = useState<number>(0)
  useEffect(()=>{
    if(userData) router.push("/")
  })
  return (
    <>
      <div className={style.header}>
        <Header login={true}/>
      </div>
      <div className={style.sidebar}>
        <Sidebar login={true}/>
      </div>
      <div className={style.background}>
      <div className={style.left}>
        <h1 className={style.h1}>Entre na sua conta</h1>
        <form className={style.form} onSubmit={(e) => login(e)}>
          <p className={style.p2}>Email:</p>
          <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({ ...informations, email: e.target.value })} type="email" placeholder="Email" />
          {fieldError.email ? <p className={style.p}>{errorMessage.email}</p>:<div className={style.space}></div>}
          <p className={style.p2}>Senha:</p>
          <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />
          {fieldError.password ? <p className={style.p}>{errorMessage.password}</p>:<div className={style.space}></div>}
          <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Entrar"}</button>
          {ActiveLink({ children: "Ainda não tem cadastro? Clique aqui!", href: "/cadastrar" })}
          <p className={style.forgot} onClick={()=> setForgot(1)}>Esqueceu a senha?</p>
        </form>
        
        {forgot ===  1 && <div className={style.forgotPass}>
          <h1>Insira seu email</h1>
          <input value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}placeholder="Email" />
          {messageError? <p className={style.p}>{messageError}</p>:<div className={style.space}></div>}
          <button onClick={() => forgotPassword()}>Enviar código</button>
        </div>
        }
        
        {forgot === 2 && <div className={style.forgotPass}>
          <h1>Insira o código</h1>
          <input value={code} onChange={(e) => setCode(e.target.value)}placeholder="Código" />
          {messageError? <p className={style.p}>{messageError}</p>:<div className={style.space}></div>}
          <button onClick={() => verifyCode()}>Enviar código</button>
        </div>}

        {forgot === 3 && <form onSubmit={(e) => newPass(e)} className={style.forgotPass}>
          <h1>Insira a nova senha</h1>
          <input type="password" value={newPassword.password} onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}placeholder="Nova senha" />
          <input type="password" value={newPassword.confirmPassword} onChange={(e) => setNewPassword({...newPassword, confirmPassword: e.target.value})}placeholder="Confirme a nova senha" />
          {messageError? <p className={style.p}>{messageError}</p>:<div className={style.space}></div>}
          <button type="submit">Enviar código</button>
        </form>}
      </div>
      <div className={style.right}>
        <div>
        <h1 className={style.title}>Alugue o equipamento que você precisa em apenas alguns cliques!</h1>
        <p>Faça sua escolha entre carros, motos, caminhões, tratores, escavadeiras, equipamentos de academia, ferramentas para construção civil e muito mais!</p>
        <p>A locação de tudo o que você precisa em um só lugar!</p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  )

  async function forgotPassword(){
    if(!forgotEmail || !forgotEmail.includes("@") || !forgotEmail.includes(".")){
      setMessageErro("Insira um email válido")
      return
    }
    try{

      await sendEmail({email: forgotEmail})
      setMessageErro("")
      setForgot(2)
    }catch(err : any){
      if (err?.response?.status === 404) {
        toast.warn(err.response.data.message)
      }
    }
  }

  async function verifyCode(){
    if(!code){
      setMessageErro("Insira um código válido")
      return
    }
    try{
      await sendCode({email: forgotEmail, code})
      setMessageErro("")
      setForgot(3)
    }catch(err : any){
      if (err?.response?.status === 404) {
        toast.warn(err.response.data.message)
      }
    }
  }

  async function newPass(e: FormEvent) {
    e.preventDefault()
    if(!newPassword.password || !newPassword.confirmPassword){
      setMessageErro("Preencha todos os campos")
      return
    }
    if(newPassword.password !== newPassword.confirmPassword){
      setMessageErro("As senhas devem ser iguais")
      return
    }
    if(newPassword.password.length < 6 || newPassword.confirmPassword.length<6){
      setMessageErro("A senha deve conter mais de 6 caracteres")
      return
    }

    try{
      await forgotPasswordPost({email: forgotEmail, password: newPassword.password})
      setMessageErro("")
      setForgot(0)
      toast.success("Senha alterada com sucesso!")
    }catch(err : any){
      if (err?.response?.status === 404) {
        toast.warn(err.response.data.message)
      }
    }
  }

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
    } catch (err: any) {
      setDisable(false)
      if (err?.response?.status === 401) {
        toast.warn(err.response.data.message)
      }
    }
  }
}