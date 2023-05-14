import UserContext from "@/APIContext/UserContext"
import { cepValidation } from "@/services/cep"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from "react"
import style from "@/styles/user_page/user_update.module.css";
import { DebounceInput } from "react-debounce-input";
import { ThreeDots } from "react-loader-spinner";
import { getStates } from "@/services/types.services";
import { roboto } from "@/styles/fonts";
import { deleteUser, loginUser, logoutUser, updateUser } from "@/services/user-services";

export default function UserUpdate() {
  const router = useRouter()
  const [deleter, setDeleter] = useState(false)
  const [disable, setDisable] = useState(false)
  const [informations, setInformations] = useState<any>({ name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: 0 })
  const [errorMessage, setErrorMessage] = useState({ name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: "" })
  const [fieldError, setFieldError] = useState(() => ({ name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: "" }))
  const [states, setStates] = useState<{ id: number, name: string }[]>([])
  const [userState, setUserState] = useState<string>("")
  const { userData, setUserData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const states = await getStates()
      setStates(states)
      setUserState(states[userData.user.address.cities.states_id-1].name)
    } catch (err: any) { }
  }, [])

  useEffect(() => {
    if (userData) {
      handleCall()
      
      setInformations({
        ...informations,
        name: userData.user.name, cpf: userData.user.cpf, phone: userData.user.phone,
        cep: Number(userData.user.address.cep),
        address: userData.user.address.address,
        number: Number(userData.user.address.number),
        complement: userData.user.address.complement,
        city: userData.user.address.cities.name,
        uf: userData.user.address.cities.states_id
      })
    }

  }, [userState])

  function findId(value: string) {
    let found = -1
    states.forEach((e, index) => {
      if (e.name == value) {
        found = index
      }
    })

    setInformations({ ...informations, uf: found+1 })
  }

  async function handleCep(e: ChangeEvent | any) {
    const value = e.target.value
    
    function findUf(uf: string | null): number {
      if (uf === null || undefined) return 1

      const judge = states?.map((e) => e.name)
      if (!judge?.indexOf(uf?.toUpperCase())) return -2

      return judge?.indexOf(uf?.toUpperCase())
    }

    if (value.length >= 8) {
      try {
        const cep = await cepValidation(value)

        if (cep.uf !== undefined) {
          setInformations({
            ...informations,
            cep: value,
            address: cep.bairro + " " + cep.logradouro,
            complement: cep.complemento,
            city: cep.localidade,
            uf: findUf(cep.uf)
          })
          
          setErrorMessage({ ...errorMessage, cep: "campo Obrigatório" })
          setFieldError({ ...fieldError, cep: false })
        } else {
          setInformations({ ...informations, cep: value })
          setErrorMessage({ ...errorMessage, cep: "Cep Inválido" })
          setFieldError({ ...fieldError, cep: true })
        }

      } catch (err) {
        console.log(err)
      }
    }
    if (value.length < 8) {
      setInformations({ ...informations, cep: value })
      setErrorMessage({ ...errorMessage, cep: "campo Obrigatório" })
      setFieldError({ ...fieldError, cep: false })
    }
  }

  async function updateUserPost(e: FormEvent) {
    e.preventDefault()
    setDisable(true)
    
    const fields = ["name", "cpf", "phone", "cep", "address", "number", "complement", "city", "uf"]
    let newFieldError: any = { name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: false };
    let error = {name: "", cpf: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", uf: "" }

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
    if(informations.cpf.length!==11){
      newFieldError = { ...newFieldError, cpf: true };
      error = { ...error, cpf: "CPF inválido!" }
    }
    if(informations.phone.length!==11){
      newFieldError = { ...newFieldError, phone: true };
      error = { ...error, phone: "Telefone inválido!" }
    }
    console.log(informations.cep)
    if(String(informations.cep).length!==8){
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
      name: informations.name,
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
      const user = await updateUser(register, userData.token)
      setDisable(false)
      setUserData({ ...userData, user: user })
    } catch (err) {
      console.log(err)
      setErrorMessage({ ...errorMessage, cep: "CEP inválido!"})
      setFieldError({ ...fieldError, cep: true })
      setDisable(false)
    }
  }

  async function logoutUserPost() {
    try {
      await logoutUser(userData.token)
      setUserData(null)
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteUserPost() {
    try {
      await deleteUser(userData.token)
      setUserData(null)
    } catch (err) {
      console.log("mosntro")
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
            <h1>Informações Pessoais</h1>
            <p className={style.p2}>Nome:</p>
            <input disabled={disable} className={style.input} value={informations.name} onChange={(e) => setInformations({ ...informations, name: e.target.value })} type="text" placeholder="Nome" />
            {fieldError.name ? <p className={style.p}>{errorMessage.name}</p> : <div className={style.space}></div>}
            <p className={style.p2}>CPF:</p>
            <input disabled={disable} className={style.input} value={informations.cpf} onChange={(e) => setInformations({ ...informations, cpf: e.target.value })} type="number" placeholder="CPF" />
            {fieldError.cpf ? <p className={style.p}>{errorMessage.cpf}</p> : <div className={style.space}></div>}
            <p className={style.p2}>Telefone:</p>
            <input disabled={disable} className={style.input} value={informations.phone} onChange={(e) => setInformations({ ...informations, phone: e.target.value })} type="number" placeholder="Telefone" />
            {fieldError.phone ? <p className={style.p}>{errorMessage.phone}</p> : <div className={style.space}></div>}
            <button className={style.disconnect} disabled={disable} type="button" onClick={() => logoutUserPost()}>Desconectar</button>
            <button className={style.delete} disabled={disable} type="button" onClick={() => setDeleter(true)}>Deletar Conta</button>
          </div>

          <div className={style.color}>
          </div>

          <div>
            <h1>Endereço</h1>
            <p className={style.p2}>CEP:</p>
            <DebounceInput disabled={disable} className={style.input} value={informations.cep} debounceTimeout={300} minLength={1} onChange={async (e) => handleCep(e)} type="number" placeholder="CEP" />
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
            <select value={userState} className={style.input} onChange={(e) => findId(e.target.value)}>
              {states ?
                states.map((s, index) => {
                  return <option key={index} className={style.input} placeholder="Estado">
                    {s.name}
                  </option>
                })
                : null}
            </select>
            <p className={style.p2}>Cidade:</p>
            <input disabled={disable} className={style.input} value={informations.city} onChange={(e) => setInformations({ ...informations, city: e.target.value })} type="text" placeholder="Cidade" />
            {fieldError.city ? <p className={style.p}>{errorMessage.city}</p> : <div className={style.space}></div>}
            <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Atualizar"}</button>

          </div>

        </form>
      </div>
    </>
  )
}