import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import style from "../styles/Signup.module.css";
import Sidebar from "@/Components/Sidebar";
import { FormEvent, useState, useEffect, useContext, useCallback, ChangeEvent} from "react"
import { ThreeDots } from "react-loader-spinner";
import UserContext from "@/APIContext/UserContext";
import { useRouter } from "next/router";
import { signupUser } from "@/services/user-services";
import { getStates } from "@/services/types.services";
import { cepValidation } from "@/services/cep";
import {DebounceInput} from 'react-debounce-input';

export default function Cadastro() {
  const router = useRouter()

  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<any>({ email: "", password: "", password_confirmation: "", name: "", last_name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: 0 })
  const [errorMessage, setErrorMessage] = useState({ email: "Campo Obrigatório!", password: "Campo Obrigatório!", password_confirmation: "Campo Obrigatório!", name: "Campo Obrigatório!", last_name: "Campo Obrigatório!", cpf: "Campo Obrigatório!", phone: "Campo Obrigatório!", cep: "Campo Obrigatório!", address: "Campo Obrigatório!", number: "Campo Obrigatório!", complement: "Campo Obrigatório!", city: "Campo Obrigatório!", uf: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({ email: false, password: false, password_confirmation: false, name: false, last_name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: "" }))
  const [states, setStates] = useState<{ id: number, name: string }[]>()

  const { userData } = useContext(UserContext) as { userData: string }

  const handleCall = useCallback(async () => {
    try {
      const states = await getStates()
      setStates(states)
    } catch (err: any) {

    }
  }, [])

  useEffect(() => {
    if (userData) { router.push("/") }
    else {
      handleCall()
    }
  }, [])

  async function handleCep(e: ChangeEvent | any) {
    const value = e.target.value

    function findUf(uf: string | null) : number {
      if(uf === null || undefined) return 1

      const judge = states?.map((e) => e.name)
      if(!judge?.indexOf( uf?.toUpperCase())) return -2

      return judge?.indexOf( uf?.toUpperCase())
    }

    if(value.length >= 8) {
      try {
        const cep = await cepValidation(value)

        if(cep.uf !== undefined) {
          setInformations({...informations, 
            cep: value,
            address: cep.bairro + " " + cep.logradouro, 
            complement: cep.complemento, 
            city: cep.localidade,
            uf: findUf(cep.uf) 
          })
          setErrorMessage({...errorMessage, cep:"campo Obrigatório"})
          setFieldError({...fieldError, cep: false})
        }else{
          setInformations({...informations,  cep: value})
          setErrorMessage({...errorMessage, cep:"Cep Inválido"})
          setFieldError({...fieldError, cep: true})
        }

      }catch (err) {
        console.log(err)
      }
    }
    if (value.length < 8){
      setInformations({...informations,  cep: value})
      setErrorMessage({...errorMessage, cep:"campo Obrigatório"})
      setFieldError({...fieldError, cep: false})
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
        <h1 className={style.h1}>Crie sua conta!</h1>
        <form className={style.form} onSubmit={(e) => SignUp(e)}>

          <div>
            {fieldError.email && <p className={style.p}>{errorMessage.email}</p>}
            <input disabled={disable} className={style.input} value={informations.email} onChange={(e) => setInformations({ ...informations, email: e.target.value })} type="email" placeholder="Email" />
            {fieldError.password && <p className={style.p}>{errorMessage.password}</p>}
            <input disabled={disable} className={style.input} value={informations.password} onChange={(e) => setInformations({ ...informations, password: e.target.value })} type="password" placeholder="Senha" />
            {fieldError.password_confirmation && <p className={style.p}>{errorMessage.password_confirmation}</p>}
            <input disabled={disable} className={style.input} value={informations.password_confirmation} onChange={(e) => setInformations({ ...informations, password_confirmation: e.target.value })} type="password" placeholder="Confirmar senha" />
            {fieldError.name && <p className={style.p}>{errorMessage.name}</p>}
            <input disabled={disable} className={style.input} value={informations.name} onChange={(e) => setInformations({ ...informations, name: e.target.value })} type="text" placeholder="Nome" />
            {fieldError.last_name && <p className={style.p}>{errorMessage.last_name}</p>}
            <input disabled={disable} className={style.input} value={informations.last_name} onChange={(e) => setInformations({ ...informations, last_name: e.target.value })} type="text" placeholder="Sobrenome" />
            {fieldError.cpf && <p className={style.p}>{errorMessage.cpf}</p>}
            <input disabled={disable} className={style.input} value={informations.cpf} onChange={(e) => setInformations({ ...informations, cpf: e.target.value })} type="number" placeholder="CPF" />
            {fieldError.phone && <p className={style.p}>{errorMessage.phone}</p>}
            <input disabled={disable} className={style.input} value={informations.phone} onChange={(e) => setInformations({ ...informations, phone: e.target.value })} type="number" placeholder="Telefone" />
          </div>

          <div>

            {fieldError.cep && <p className={style.p}>{errorMessage.cep}</p>}
            <DebounceInput disabled={disable} className={style.input} value={informations.cep} debounceTimeout={300} minLength={1}  onChange={async (e) => handleCep(e)} type="number" placeholder="CEP" />

            {fieldError.address && <p className={style.p}>{errorMessage.address}</p>}
            <input disabled={disable} className={style.input} value={informations.address} onChange={(e) => setInformations({ ...informations, address: e.target.value })} type="text" placeholder="Endereço" />
            {fieldError.number && <p className={style.p}>{errorMessage.number}</p>}
            <input disabled={disable} className={style.input} value={informations.number} onChange={(e) => setInformations({ ...informations, number: e.target.value })} type="number" placeholder="Número" />
            {fieldError.complement && <p className={style.p}>{errorMessage.complement}</p>}
            <input disabled={disable} className={style.input} value={informations.complement} onChange={(e) => setInformations({ ...informations, complement: e.target.value })} type="text" placeholder="Complemento" />
            
            <select className={style.input} value={states? states[informations.uf].name: 0}>
              {states ?
                states.map((s, index) => {
                  return <option key={index} className={style.input} 
                    onClick={(e) => setInformations({ ...informations, uf: s.id })} placeholder="Estado">
                    {s.name}
                  </option>
                })
                : null}
            </select>

            <input disabled={disable} className={style.input} value={informations.city} onChange={(e) => setInformations({ ...informations, city: e.target.value })} type="text" placeholder="Cidade" />
            <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Cadastrar"}</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )

  async function SignUp(e: FormEvent) {
    e.preventDefault()
    setDisable(true)
    const fields = ["name", "email", "password", "password_confirmation", "last_name", "cpf", "phone", "cep", "address", "number", "complement", "city", "uf"]
    let newFieldError: any = { name: false, email: false, password: false, password_confirmation: false, last_name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: false };

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
      setErrorMessage({ ...errorMessage, password_confirmation: "Senhas não podem ser diferentes!" })
      setFieldError(newFieldError)
      return
    }

    const register = {
      name: informations.name + informations.last_name,
      email: informations.email,
      password: informations.password,
      phone: informations.phone,
      address: {
        cep: informations.cep,
        address: informations.address,
        complement: informations.complement,
        number: informations.number,
        city: informations.city,
        state_id: informations.uf
      }
    }

    try {
      await signupUser(register)
    } catch (err) {
      console.log(err)
    }
  }
}