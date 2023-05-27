import UserContext from "@/APIContext/UserContext"
import { useRouter } from "next/router"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import style from "@/styles/user_page/user_update.module.css";
import { ThreeDots } from "react-loader-spinner";
import { getStates } from "@/services/types.services";
import { roboto } from "@/styles/fonts";
import { deleteUser, logoutUser, updateUser } from "@/services/user-services";
import MaskedInput from 'react-text-mask'
import { toast } from "react-toastify";
import findId from "@/hooks/findSelectId";
import handleCep from "@/hooks/handleCep";

export default function UserUpdate() {
  const router = useRouter()
  const [deleter, setDeleter] = useState(false)
  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<any>({ name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: 0 })
  const [errorMessage, setErrorMessage] = useState({ name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: "" })
  const [fieldError, setFieldError] = useState(() => ({ name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: "" }))
  const [states, setStates] = useState<{ id: number, name: string }[]>([])
  const { userData, setUserData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const states = await getStates()
      setStates(states)
    } catch (err: any) { }
  }, [])

  useEffect(() => {
    if (userData) {
      handleCall()

      setInformations({
        ...informations,
        name: userData.user.name, cpf: userData.user.cpf, phone: userData.user.phone,
        cep: userData.user.address.cep,
        address: userData.user.address.address,
        number: userData.user.address.number,
        complement: userData.user.address.complement,
        city: userData.user.address.cities.name,
        uf: userData.user.address.cities.state_id - 1
      })
    }

  }, [])

  async function updateUserPost(e: FormEvent) {
    e.preventDefault()
    setDisable(true)

    const fields = ["name", "cpf", "phone", "cep", "address", "number", "complement", "city", "uf"]
    let newFieldError: any = { name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: false };
    let error = { name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: "" }

    for (let item of fields) {
      if (!String(informations[item])) {
        newFieldError = { ...newFieldError, [item]: true };
        error = { ...error, [item]: "Campo Obrigatório!" }
      }
    }
    for (let item of fields) {
      if (String(informations[item]).length > 100) {
        newFieldError = { ...newFieldError, [item]: true };
        error = { ...error, [item]: "Quantia máxima de caracteres: 100" }
      }
    }

    if (informations.name.length < 3) {
      newFieldError = { ...newFieldError, name: true };
      error = { ...error, name: "Nome muito curto!" }
    }
    if (/[0-9]/.test(informations.name) === true) {
      newFieldError = { ...newFieldError, name: true };
      error = { ...error, name: "Nome inválido!" }
    }
    if (/\W|_/.test(informations.name) === true) {
      newFieldError = { ...newFieldError, name: true };
      error = { ...error, name: "Nome inválido!" }
    }
    if(informations.cpf.length!==11){
    if (informations.cpf.length !== 11) {
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
    if(informations.phone.length!==11){
    if (informations.phone.length < 11) {
      newFieldError = { ...newFieldError, phone: true };
      error = { ...error, phone: "Telefone inválido!" }
    }
  }
    if(String(informations.cep).length!==8){
    if (String(informations.cep).trim().length !== 8) {
      newFieldError = { ...newFieldError, cep: true };
      error = { ...error, cep: "CEP inválido!" }
    }
  }
    let foundError;
    for (let item of fields) {
      if (newFieldError[item]) foundError = true
    }
    if (foundError) {
      setDisable(false)
      setErrorMessage({ ...error })
      setFieldError({ ...newFieldError })
      return
    }

    const register = {
      name: informations.name,
      phone: informations.phone,
      cpf: informations.cpf.trim(),
      address: {
        cep: String(informations.cep).trim(),
        address: informations.address.trim(),
        complement: informations.complement.trim(),
        number: String(informations.number),
        city: informations.city.trim(),
        state_id: informations.uf + 1
      }
    }

    try {
      const user = await updateUser(register, userData.token)
      setDisable(false)
      setUserData({ ...userData, user: user })
    } catch (err: any) {
      if (err?.response?.status === 409) {
        toast.warn(err.response.data.message)
      }
      if (err?.response?.status === 400) {
        setErrorMessage({ ...errorMessage, cep: "CEP inválido!" })
      }
      setFieldError({ ...fieldError, cep: true })
      setDisable(false)
    }
  }

  async function logoutUserPost() {
    try {
      await logoutUser(userData.token)
      setUserData(null)
    } catch (err) {
    }
  }

  async function deleteUserPost() {
    try {
      await deleteUser(userData.token)
      setUserData(null)
    } catch (err) {
    }
  }

  return (
    <>
      <div className={`${style.background} ${roboto.className}`}>
        {deleter &&
          <div className={style.modal}>
            <h1>Deseja mesmo deletar sua conta?</h1>
            <p>Você perderá todos os seus dados e não poderá recuperá-los!</p>
            <div className={style.buttons}>
              <button onClick={() => setDeleter(false)}>Não</button>
              <button onClick={() => deleteUserPost()}>Sim</button>
            </div>

          </div>}
        <form className={style.form} onSubmit={(e) => updateUserPost(e)}>

          <div>
            <h1 className={style.personal}>Informações Pessoais</h1>
            <p className={style.p2}>Nome:</p>
            <input disabled={disable} className={style.input} value={informations.name} onChange={(e) => setInformations({ ...informations, name: e.target.value })} type="text" placeholder="Nome" />
            {fieldError.name ? <p className={style.p}>{errorMessage.name}</p> : <div className={style.space}></div>}
            <p className={style.p2}>CPF:</p>

            <MaskedInput type="cpf" defaultValue={""} className={style.input} mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]} value={informations.cpf}
              onChange={(e) => setInformations({ ...informations, cpf: e.target.value.replace(/[^\d]/g, "") })} placeholder="CPF" disabled={disable} />
            {fieldError.cpf ? <p className={style.p}>{errorMessage.cpf}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Telefone:</p>
            <MaskedInput type="phone" className={style.input} defaultValue={""} mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} value={informations.phone}
              onChange={(e) => setInformations({ ...informations, phone: e.target.value.replace(/[^\d]/g, "")}) } placeholder="Celular" disabled={disable} />
            {fieldError.phone ? <p className={style.p}>{errorMessage.phone}</p> : <div className={style.space}></div>}

            <button className={style.disconnect} disabled={disable} type="button" onClick={() => logoutUserPost()}>Desconectar</button>
            <button className={style.delete} disabled={disable} type="button" onClick={() => setDeleter(true)}>Deletar Conta</button>
          </div>

          <div>
            <h1 className={style.address4}>Endereço</h1>
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

            <select className={style.input} disabled={true} value={states[informations.uf] ? states[informations.uf].name :
              userData ? userData.user.address.cities.states.name : "AC"} onChange={(e) => findId(e.target.value, states, setInformations, informations)}>
              {states ?
                states.map((s, index) => {
                  return <option key={index} className={style.input} placeholder="Estado">
                    {s.name}
                  </option>
                })
                : null}
            </select>
            <p className={style.p2}>Cidade:</p>
            <input disabled={true} className={style.input} value={informations.city} onChange={(e) => setInformations({ ...informations, city: e.target.value })} type="text" placeholder="Cidade" />
            {fieldError.city ? <p className={style.p}>{errorMessage.city}</p> : <div className={style.space}></div>}
            <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Atualizar"}</button>

          </div>

        </form>
      </div>
    </>
  )
}