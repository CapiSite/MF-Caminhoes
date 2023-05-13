import { cepValidation } from "@/services/cep"
import { ChangeEvent } from "react"

export default async function handleCep(e: ChangeEvent | any, states: { id: number, name: string }[],
  setValue: any, presentValues: any, errorMessage: any, setErrorMessage: any , fieldError: any, setFieldError: any) {

  const value = e.target.value.replace(/[^\d]/g, "")

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
        setValue({
          ...presentValues,
          cep: value,
          address: cep.bairro + " " + cep.logradouro,
          complement: cep.complemento,
          number: "",
          city: cep.localidade,
          uf: findUf(cep.uf)
        })

        setErrorMessage({ ...errorMessage, cep: "campo Obrigatório" })
        setFieldError({ ...fieldError, cep: false })
      } else {
        setValue({ ...presentValues, cep: value })
        setErrorMessage({ ...errorMessage, cep: "Cep Inválido" })
        setFieldError({ ...fieldError, cep: true })
      }

    } catch (err) {
      console.log(err)
    }
  }
  if (value.length < 8) {
    setValue({ ...presentValues, cep: value })
    setErrorMessage({ ...errorMessage, cep: "campo Obrigatório" })
    setFieldError({ ...fieldError, cep: false })
  }
}