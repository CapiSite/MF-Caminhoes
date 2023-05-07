import axios from "axios"

export async function cepValidation(cep: string) {

  const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/ `)
  return response.data
}
