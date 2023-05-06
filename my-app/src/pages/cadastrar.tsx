import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/Signup.module.css";
import Sidebar from "@/Components/Sidebar";
import {FormEvent, useState, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner";


export default function Cadastro() {

  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<any>({email: "", password: "", password_confirmation: "", name: "", last_name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: ""})
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!", password_confirmation: "Campo Obrigatório!", name: "Campo Obrigatório!", last_name: "Campo Obrigatório!", cpf: "Campo Obrigatório!", phone: "Campo Obrigatório!", cep: "Campo Obrigatório!", address: "Campo Obrigatório!", number: "Campo Obrigatório!", complement: "Campo Obrigatório!", city: "Campo Obrigatório!", uf: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false, password_confirmation: false, name: false, last_name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: ""  }))
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
            <h1 className={style.h1}>Crie sua conta!</h1>
                <form className={style.form} onSubmit={SignUp}>
                  <div>
                    {fieldError.email && <p className={style.p}>{errorMessage.email}</p>}
                    <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({...informations, email: e.target.value})} type="email" placeholder="Email" />
                    {fieldError.password && <p className={style.p}>{errorMessage.password}</p>}
                    <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({...informations, password: e.target.value})} type="password" placeholder="Senha" />
                    {fieldError.password_confirmation && <p className={style.p}>{errorMessage.password_confirmation}</p>}
                    <input disabled={disable} className={style.input} value={informations.password_confirmation} onChange={(e) => setInformations({...informations, password_confirmation: e.target.value})} type="password" placeholder="Confirmar senha" />
                    {fieldError.name && <p className={style.p}>{errorMessage.name}</p>}
                    <input disabled={disable} className={style.input} value={informations.name} onChange={(e) => setInformations({...informations, name: e.target.value})} type="text" placeholder="Nome"/>
                    {fieldError.last_name && <p className={style.p}>{errorMessage.last_name}</p>}
                    <input disabled={disable} className={style.input} value={informations.last_name} onChange={(e) => setInformations({...informations, last_name: e.target.value})} type="text" placeholder="Sobrenome" />
                    {fieldError.cpf && <p className={style.p}>{errorMessage.cpf}</p>}
                    <input disabled={disable} className={style.input} value={informations.cpf} onChange={(e) => setInformations({...informations, cpf: e.target.value})} type="number" placeholder="CPF" />
                    {fieldError.phone && <p className={style.p}>{errorMessage.phone}</p>}
                    <input disabled={disable} className={style.input} value={informations.phone} onChange={(e) => setInformations({...informations, phone: e.target.value})} type="number" placeholder="Telefone" />
                  </div>
                  <div>
                    {fieldError.cep && <p className={style.p}>{errorMessage.cep}</p>}
                    <input disabled={disable} className={style.input} value={informations.cep} onChange={(e) => setInformations({...informations, cep: e.target.value})} type="number" placeholder="CEP" />
                    {fieldError.address && <p className={style.p}>{errorMessage.address}</p>}
                    <input disabled={disable} className={style.input} value={informations.address} onChange={(e) => setInformations({...informations, address: e.target.value})} type="text" placeholder="Endereço" />
                    {fieldError.number && <p className={style.p}>{errorMessage.number}</p>}
                    <input disabled={disable} className={style.input} value={informations.number} onChange={(e) => setInformations({...informations, number: e.target.value})} type="number" placeholder="Número" />
                    {fieldError.complement && <p className={style.p}>{errorMessage.complement}</p>}
                    <input disabled={disable} className={style.input} value={informations.complement} onChange={(e) => setInformations({...informations, complement: e.target.value})} type="text" placeholder="Complemento" />
                    {fieldError.uf && <p className={style.p}>{errorMessage.uf}</p>}
                    <input disabled={disable} className={style.input} value={informations.uf} onChange={(e) => setInformations({...informations, uf: e.target.value})} type="text" placeholder="Estado" />
                    {fieldError.city && <p className={style.p}>{errorMessage.city}</p>}
                    <input disabled={disable} className={style.input} value={informations.city} onChange={(e) => setInformations({...informations, city: e.target.value})} type="text" placeholder="Cidade" />
                    <button disabled={disable} className={style.button} type="submit">{disable?<ThreeDots color="white"/>:"Cadastrar"}</button>
                  </div>
                </form>
            </div>
          <Footer />
    </>
  )
  function SignUp(e : FormEvent){
    e.preventDefault()
    setDisable(true)
    const fields = ["name", "email", "password", "password_confirmation", "last_name", "cpf", "phone", "cep", "address", "number", "complement", "city", "uf"]
    let newFieldError:any = { name: false, email: false, password: false, password_confirmation: false, last_name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: false };
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
    if (informations.password !== informations.password_confirmation) {
        setDisable(false)
        newFieldError = { ...newFieldError, password_confirmation: true };
        setErrorMessage({...errorMessage, password_confirmation: "Senhas não podem ser diferentes!"})
        setFieldError(newFieldError)
        return 
    }
    const register = {...informations}
    delete register.password_confirmation

    ///RODRIGO, LINKA COM O SERVIDOR AQUI, PARA ENVIAR OS DADOS!!
    ///Váriavel com os itens para fazer cadastro é a "register"
  }
}