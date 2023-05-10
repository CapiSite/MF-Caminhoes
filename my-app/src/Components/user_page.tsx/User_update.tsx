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
  const [errorMessage, setErrorMessage] = useState({ name: "Campo Obrigatório!", cpf: "Campo Obrigatório!", phone: "Campo Obrigatório!", cep: "Campo Obrigatório!", address: "Campo Obrigatório!", number: "Campo Obrigatório!", complement: "Campo Obrigatório!", city: "Campo Obrigatório!", uf: "Campo Obrigatório!" })
  const [fieldError, setFieldError] = useState(() => ({name: false, cpf: false, phone: false, cep: false, address: false, number: false, complement: false, city: false, uf: "" }))
  const [states, setStates] = useState<{ id: number, name: string }[]>()
  
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
      setInformations({...informations, 
        name : userData.user.name, cpf:userData.user.cpf, phone: userData.user.phone,
        cep: Number(userData.user.address.cep),
        address: userData.user.address.address,
        number: Number(userData.user.address.number),
        complement: userData.user.address.complement,
        city: userData.user.address.cities.name,
        uf: userData.user.address.cities.state_id
      })
    }

  }, [])

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
    const fields = ["name", "email", "password", "password_confirmation", "cpf", "phone", "cep", "address", "number", "complement", "city", "uf"]
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
      const user =await updateUser(register, userData.token)
      setDisable(false)
      setUserData({...userData, user:user})
    } catch (err) {
      console.log(err)
      setDisable(false)
    }
  }
  
  async function logoutUserPost() {
    try{
      await logoutUser(userData.token)
      setUserData(null)
      router.push("/")
    }catch(err) {
      console.log(err)
    }
  }

  async function deleteUserPost() {
    try{
      await deleteUser(userData.token)
      setUserData(null)
    }catch(err) {
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
            {fieldError.name && <p className={style.p}>{errorMessage.name}</p>}
            <input disabled={disable} className={style.input} value={informations.name} onChange={(e) => setInformations({ ...informations, name: e.target.value })} type="text" placeholder="Nome" />
            {fieldError.cpf && <p className={style.p}>{errorMessage.cpf}</p>}
            <input disabled={disable} className={style.input} value={informations.cpf} onChange={(e) => setInformations({ ...informations, cpf: e.target.value })} type="number" placeholder="CPF" />
            {fieldError.phone && <p className={style.p}>{errorMessage.phone}</p>}
            <input disabled={disable} className={style.input} value={informations.phone} onChange={(e) => setInformations({ ...informations, phone: e.target.value })} type="number" placeholder="Telefone" />
            <button className={style.disconnect} onClick={() => logoutUserPost()}>Desconectar</button>
            <button className={style.delete} type="button" onClick={() => setDeleter(true)}>Deletar Conta</button>
          </div>

          <div className={style.color}>
          </div>

          <div>
            <h1>Endereço</h1>
            {fieldError.cep && <p className={style.p}>{errorMessage.cep}</p>}
            <DebounceInput disabled={disable} className={style.input} value={informations.cep} debounceTimeout={300} minLength={1} onChange={async (e) => handleCep(e)} type="number" placeholder="CEP" />          
            {fieldError.address && <p className={style.p}>{errorMessage.address}</p>}
            <input disabled={disable} className={style.input} value={informations.address} onChange={(e) => setInformations({ ...informations, address: e.target.value })} type="text" placeholder="Endereço" />
            {fieldError.number && <p className={style.p}>{errorMessage.number}</p>}
            <input disabled={disable} className={style.input} value={informations.number} onChange={(e) => setInformations({ ...informations, number: e.target.value })} type="number" placeholder="Número" />
            {fieldError.complement && <p className={style.p}>{errorMessage.complement}</p>}
            <input disabled={disable} className={style.input} value={informations.complement} onChange={(e) => setInformations({ ...informations, complement: e.target.value })} type="text" placeholder="Complemento" />

            <select className={style.input} value={states ? states[informations.uf].name : 0}>
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
            <button disabled={disable} className={style.button} type="submit">{disable ? <ThreeDots color="white" /> : "Atualizar"}</button>

          </div>

        </form>
      </div>
    </>
  )
}