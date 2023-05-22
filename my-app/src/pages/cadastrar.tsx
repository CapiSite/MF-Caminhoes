import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/Signup.module.css";
import Sidebar from "@/Components/Sidebar";
import { FormEvent, useState, useEffect, useContext, useCallback, ChangeEvent } from "react"
import { ThreeDots } from "react-loader-spinner";
import UserContext from "@/APIContext/UserContext";
import { useRouter } from "next/router";
import { signupUser } from "@/services/user-services";
import { getStates } from "@/services/types.services";

import MaskedInput from "react-text-mask";
import findId from "@/hooks/findSelectId";
import handleCep from "@/hooks/handleCep";
import { toast } from "react-toastify";

export default function Cadastro() {
  const router = useRouter()

  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<any>({ email: "", password: "", password_confirmation: "", name: "", last_name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: 0, checkbox:false })
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!", password_confirmation: "Campo Obrigatório!", name: "Campo Obrigatório!", last_name: "Campo Obrigatório!", cpf: "Campo Obrigatório!", phone: "Campo Obrigatório!", cep: "Campo Obrigatório!", address: "Campo Obrigatório!", number: "Campo Obrigatório!", complement: "Campo Obrigatório!", city: "Campo Obrigatório!", uf: "Campo Obrigatório!", checkbox: "Campo Obrigatório!"})
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false, password_confirmation: false, name: false, last_name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: "", checkbox:false }))
  const [states, setStates] = useState<{ id: number, name: string }[]>([])

  const { userData } = useContext(UserContext) as { userData: string }

  const handleCall = useCallback(async () => {
    try {
      const states = await getStates()
      setStates(states)
    } catch (err: any) { }
  }, [])

  useEffect(() => {
    if (userData) { router.push("/") }
    else {
      handleCall()
    }
  }, [fieldError])

  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.background}>
        <h1 className={style.h1}>Crie sua conta!</h1>
        <form className={style.form} onSubmit={(e) => SignUp(e)}>

          <div>

            <p className={style.p2}>Email:</p>
            <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({ ...informations, email: e.target.value })} type="email" placeholder="Email" />
            {fieldError.email ? <p className={style.p}>{errorMessage.email}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Senha:</p>
            <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />
            {fieldError.password ? <p className={style.p}>{errorMessage.password}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Confirmar a senha:</p>
            <input disabled={disable} className={style.input} value={informations.password_confirmation} onChange={(e) => setInformations({ ...informations, password_confirmation: e.target.value })} type="password" placeholder="Confirmar senha" />
            {fieldError.password_confirmation ? <p className={style.p}>{errorMessage.password_confirmation}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Nome:</p>
            <input disabled={disable} className={style.input} value={informations.name} onChange={(e) => setInformations({ ...informations, name: e.target.value })} type="text" placeholder="Nome" />
            {fieldError.name ? <p className={style.p}>{errorMessage.name}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Sobrenome:</p>
            <input disabled={disable} className={style.input} value={informations.last_name} onChange={(e) => setInformations({ ...informations, last_name: e.target.value })} type="text" placeholder="Sobrenome" />
            {fieldError.last_name ? <p className={style.p}>{errorMessage.last_name}</p> : <div className={style.space}></div>}
            <p className={style.p2}>CPF:</p>

            <MaskedInput type="cpf" defaultValue={""} className={style.input} mask={[ /[0-9]/, /\d/,  /\d/, '.', /\d/, /\d/,  /\d/, '.', /\d/, /\d/,  /\d/,'-', /\d/, /\d/]} value={informations.cpf}
            onChange={(e) => setInformations({ ...informations, cpf: e.target.value.replace(/[^\d]/g, "")}) } placeholder="CPF" disabled={disable}/>
            {fieldError.cpf ? <p className={style.p}>{errorMessage.cpf}</p> : <div className={style.space}></div>}

            <p className={style.p2}>Telefone:</p>
            <MaskedInput type="phone" className={style.input} defaultValue={""} mask={['(', /[0-9]/, /\d/,  ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]} value={informations.phone}
            onChange={(e) => setInformations({ ...informations, phone: e.target.value.replace(/[^\d]/g, "")}) } placeholder="Celular" disabled={disable}/>
            {fieldError.phone ? <p className={style.p}>{errorMessage.phone}</p> : <div className={style.space}></div>}
          </div>
          <div>

            <p className={style.p2}>CEP:</p>
            <MaskedInput type="cep" className={style.input} defaultValue={""} mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]} value={informations.cep}
              onChange={(e) => {
                setInformations({ ...informations, cep: e.target.value.replace(/[^\d]/g, "")});
                handleCep(e, states, setInformations, informations,errorMessage, setErrorMessage, fieldError, setFieldError)
              }} placeholder="CEP" />
            {fieldError.cep ? <p className={style.p}>{errorMessage.cep}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Endereço:</p>
            <input disabled={disable} className={style.input} value={informations.address} onChange={(e) => setInformations({ ...informations, address: e.target.value })} type="text" placeholder="Endereço" />
            {fieldError.address ? <p className={style.p}>{errorMessage.address}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Número:</p>
            <input disabled={disable} className={style.input} value={informations.number} onChange={(e) => setInformations({ ...informations, number: e.target.value })} type="number" placeholder="Número" />
            {fieldError.number ? <p className={style.p}>{errorMessage.number}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Complemento:</p>
            <input disabled={disable} className={style.input} value={informations.complement} onChange={(e) => setInformations({ ...informations, complement: e.target.value })} type="text" placeholder="Complemento" />
            {fieldError.complement ? <p className={style.p}>{errorMessage.complement}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Estado:</p>
            <select className={style.input} value={states[informations.uf - 1] ? states[informations.uf -1].name : "AC"} disabled={true}>
              {states ?
                states.map((s, index) => {
                  return <option key={index} className={style.input} placeholder="Estado">
                    {s.name}
                  </option>
                })
                : null}
            </select>
            {fieldError.uf ? <p className={style.p}>{errorMessage.uf}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Cidade:</p>
            <input className={style.input} value={informations.city} onChange={(e) => setInformations({ ...informations, city: e.target.value })} disabled={true} type="text" placeholder="Cidade" />
            {fieldError.city ? <p className={style.p}>{errorMessage.city}</p> : <div className={style.space}></div>}
            <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Cadastrar"}</button>
            <div className={style.checkbox}>
              <input name="checkbox" checked={informations.checkbox} onClick={()=>setInformations({...informations, checkbox: !informations.checkbox})} type="checkbox"/>
              <label htmlFor="checkbox" onClick={()=>setInformations({...informations, checkbox: !informations.checkbox})}><span>Concordo com os </span><span onClick={()=>router.push("/privacidade")}>termos de uso e política de privacidade</span></label>
            </div>
            {fieldError.checkbox && <p className={style.p}>{errorMessage.checkbox}</p> }

          </div>
        </form>
      </div>
      <Footer />
    </>
  )

  async function SignUp(e: FormEvent) {
    e.preventDefault()
    setDisable(true)
    const fields = ["name", "email", "password", "password_confirmation", "last_name", "cpf", "phone", "cep", "address", "number", "complement", "city", "uf", "checkbox"]
    let newFieldError: any = { name: false, email: false, password: false, password_confirmation: false, last_name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: false, checkbox: false };
    let error = { email: "Campo Obrigatório!", password: "Campo Obrigatório!", password_confirmation: "Campo Obrigatório!", name: "Campo Obrigatório!", last_name: "Campo Obrigatório!", cpf: "Campo Obrigatório!", phone: "Campo Obrigatório!", cep: "Campo Obrigatório!", address: "Campo Obrigatório!", number: "Campo Obrigatório!", complement: "Campo Obrigatório!", city: "Campo Obrigatório!", uf: "Campo Obrigatório!", checkbox: "Campo Obrigatório!" }
    for (let item of fields) {
      if (!informations[item]) {
        newFieldError = { ...newFieldError, [item]: true };
        error = { ...error, [item]: "Campo Obrigatório!" }
      }
    }
    for (let item of fields) {
      if (informations[item].length > 100) {
        newFieldError = { ...newFieldError, [item]: true };
        error = { ...error, [item]: "Quantia máxima de caracteres: 100" }
      }
    }
    if (!informations.checkbox){
      newFieldError = { ...newFieldError, checkbox: true };
      error = { ...error, checkbox: "Marque os termos de serviço!" }
    }
    if(informations.email.includes(".") === false){
      newFieldError = { ...newFieldError, email: true };
      error = { ...error, email: "Email inválido!" }
    }
    if(informations.password.length<6){
      newFieldError = { ...newFieldError, password: true };
      error = { ...error, password: "Senha muito curta!" }
    }
    if (informations.password !== informations.password_confirmation) {
      newFieldError = { ...newFieldError, password_confirmation: true };
      error = { ...error, password_confirmation: "Senhas não podem ser diferentes!" }
    }

    if (informations.name.length < 3) {
      newFieldError = { ...newFieldError, name: true };
      error = { ...error, name: "Nome muito curto!" }
    }

    if (/[0-9]/.test(informations.name) === true ) {
      newFieldError = { ...newFieldError, name: true };
      error = { ...error, name: "Nome inválido!" }
    }
    if (/[0-9]/.test(informations.last_name) === true ) {
      newFieldError = { ...newFieldError, last_name: true };
      error = { ...error, last_name: "Sobrenome inválido!" }
    }
    if(informations.name.includes(" ")){
      const x = {...informations, name: informations.name.replace(" ", "")}
      if (/\W|_/.test(x.name) === true) {
        newFieldError = { ...newFieldError, name: true };
        error = { ...error, name: "Nome inválido!" }
      }
    }
    if(informations.last_name.includes(" ")){
      const x = {...informations, last_name: informations.last_name.replace(" ", "")}
      if (/\W|_/.test(x.last_name) === true) {
        newFieldError = { ...newFieldError, last_name: true };
        error = { ...error, last_name: "Sobrenome inválido!" }
      }
    }
    if(!informations.name.includes(" ")){
      if (/\W|_/.test(informations.name) === true) {
        newFieldError = { ...newFieldError, name: true };
        error = { ...error, name: "Nome inválido!" }
      }
    }
    if(!informations.last_name.includes(" ")){
      if (/\W|_/.test(informations.last_name) === true) {
        newFieldError = { ...newFieldError, last_name: true };
        error = { ...error, last_name: "Sobrenome inválido!" }
      }
    }
    if(informations.cpf.length!==11){
    if(String(informations.cpf).trim().length!==11){
      newFieldError = { ...newFieldError, cpf: true };
      error = { ...error, cpf: "CPF inválido!" }
    }
  }

    const cpf = informations.cpf.replace(/[^\d]+/g,'');	
    if(cpf === '') {
      newFieldError = { ...newFieldError, cpf: true };
      error = { ...error, cpf: "CPF inválido!" }
    }
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length !== 11 || 
      cpf === "00000000000" || 
      cpf === "11111111111" || 
      cpf === "22222222222" || 
      cpf === "33333333333" || 
      cpf === "44444444444" || 
      cpf === "55555555555" || 
      cpf === "66666666666" || 
      cpf === "77777777777" || 
      cpf === "88888888888" || 
      cpf === "99999999999")
      newFieldError = { ...newFieldError, cpf: true };
      error = { ...error, cpf: "CPF inválido!" }		
    // Valida 1o digito	
    let add = 0;	
    for (let i=0; i < 9; i ++)		
      add += parseInt(cpf.charAt(i)) * (10 - i);	
      let rev = 11 - (add % 11);	
      if (rev == 10 || rev == 11)		
        rev = 0;	
      if (rev != parseInt(cpf.charAt(9)))		
        newFieldError = { ...newFieldError, cpf: true };
        error = { ...error, cpf: "CPF inválido!" }	
    // Valida 2o digito	
    add = 0;	
    for (let i = 0; i < 10; i ++)		
      add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
      rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
      newFieldError = { ...newFieldError, cpf: true };
      error = { ...error, cpf: "CPF inválido!" }
   
 
    if(String(informations.phone).trim().length!==11){
    if(informations.phone.length!==11){
      newFieldError = { ...newFieldError, phone: true };
      error = { ...error, phone: "Telefone inválido!" }
    }
  }
    if(String(informations.cep).trim().length!==8){
      newFieldError = { ...newFieldError, cep: true };
      error = { ...error, cep: "CEP inválido!" }
    }
    let foundError;
    for (let item of fields) {
      if(newFieldError[item]) foundError = true
    } 
    if (foundError) {
      setDisable(false)
      setErrorMessage({ ...error })
      setFieldError({ ...newFieldError })
      return
    }

    const register = {
      name: informations.name + " " + informations.last_name,
      email: informations.email,
      password: informations.password,
      phone: informations.phone,
      cpf: informations.cpf,
      address: {
        cep: String(informations.cep),
        address: informations.address,
        complement: informations.complement,
        number: String(informations.number),
        city: informations.city,
        state_id: informations.uf
      }
    }

    try {
      await signupUser(register)
      router.push("/login")
    } catch (err: any) {
      setDisable(false)
      if (err?.response?.status === 409) {
        toast.warn(err.response.data.message)
      }
    }
  }
}