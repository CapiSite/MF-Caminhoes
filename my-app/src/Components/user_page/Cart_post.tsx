import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import style from '@/styles/user_page/cart_rental.module.css'
import { roboto } from "@/styles/fonts"
import { postCart, postCartPhotosMain, postCartPhotosSecondary } from "@/services/cart.services"
import UserContext from "@/APIContext/UserContext"
import CartInput from "./Cart_input"
import dayjs from "dayjs"
export default function CartPost() {
  const [brands, setBrands] = useState<{ id: number, name: string }[] >([])
  const [types, setTypes] = useState<{ id: number, name: string }[]>([])
  const [models, setModels] = useState<{ id: number, name: string }[]>([])
  const [wheels, setWheels] = useState<{ id: number, name: string }[]>([])

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [size, setSize] = useState<number>()
  const [price, setPrice] = useState<number>()
  const [brandsSelected, setBrandsSelected] = useState<string | number>("")
  const [typesSelected, setTypesSelected] = useState<string | number>("")
  const [modelsSelected, setModelsSelected] = useState<string | number>("")
  const [wheelsSelected, setWheelsSelected] = useState<string | number>("")
  const [section, setSection] = useState<number>()
  const [main, setMain] = useState<any>()
  const [secondary, setSecondary] = useState<[]>([])
  const [year, setYear] = useState<number>()
  const [status, setStatus] = useState<string>("")
  const [fieldError, setFieldError] = useState(() => ({ title: false, description: false, color: false, size: false, price: false, brandsSelected: false, typesSelected: false, modelsSelected: false, wheelsSelected: false, year: false, status: false, main: false, secondary: false, section: false }))
  const [errorMessage, setErrorMessage] = useState({ title: "Campo Obrigatório!", description: "Campo Obrigatório!", color: "Campo Obrigatório!", size: "Campo Obrigatório!", price: "Campo Obrigatório!", brandsSelected: "Campo Obrigatório!", typesSelected: "Campo Obrigatório!", modelsSelected: "Campo Obrigatório!", wheelsSelected: "Campo Obrigatório!", year: "Campo Obrigatório!", status: "Campo Obrigatório!", main: "Insira uma imagem!", secondary: "Insira uma imagem!", section: "Campo Obrigatório!" })
  const [disable, setDisable] = useState(false)

  const { userData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const brands = await getBrands()
      console.log(brands)
      setBrands(brands)

      const types = await getTypes()
      setTypes(types)

      const models = await getModels()
      setModels(models)

      const wheels = await getWheels()
      setWheels(wheels)

    } catch (err: any) { }
  }, [])


  useEffect(() => {
    handleCall()
  }, [])

  async function handlePost(e: FormEvent) {
    e.preventDefault()
    const fields = [ "title","description","color","size","price","brandsSelecte","typesSelected","modelsSelected","wheelsSelected","year","status","main","secondary","section",]
    let error = { title: "Campo Obrigatório!", description: "Campo Obrigatório!", color: "Campo Obrigatório!", size: "Campo Obrigatório!", price: "Campo Obrigatório!", brandsSelected: "Campo Obrigatório!", typesSelected: "Campo Obrigatório!", modelsSelected: "Campo Obrigatório!", wheelsSelected: "Campo Obrigatório!", year: "Campo Obrigatório!", status: "Campo Obrigatório!", main: "Insira uma imagem!", secondary: "Insira uma imagem!", section: "Campo Obrigatório!" }
    let newFieldError: any = { title: false, description: false, color: false, size: false, price: false, brandsSelected: false, typesSelected: false, modelsSelected: false, wheelsSelected: false, year: false, status: false, main: false, secondary: false, section: false };
    setDisable(true)

    if(!title) {
      newFieldError.title = true
      error.title = "Digite uma título"
    }
    if(!typesSelected) {
      newFieldError.typesSelected = true
      error.typesSelected = "Selecione um tipo de veiculo"
    }
    if(!modelsSelected) {
      newFieldError.modelsSelected = true
      error.modelsSelected = "Selecione um modelo"
    }
    if(!wheelsSelected) {
      newFieldError.wheelsSelected = true
      error.wheelsSelected = "Selecione o tipo de roda"
    }
    if(!brandsSelected){
      newFieldError.brandsSelected = true
      error.brandsSelected = "Selecione uma marca"
    }
    if(!year) {
      newFieldError.year = true
      error.year = "Digite um Ano"
    }
    if(!status) {
      newFieldError.status = true
      error.status = "Digite um status"
    }
    if(!main) {
      newFieldError.main = true
      error.main = "Insira uma imagem principal"
    }
    
    if(secondary.length<1) {
      newFieldError.secondary = true
      error.secondary = "Insira uma segunda imagem"
    }
    if(!section) {
      newFieldError.section = true
      error.section = "Digite a quantia de eixos"
    }
    if(!size){
      newFieldError.size = true
      error.size = "Digite um tamanho"
    }
    if(!price){
      newFieldError.price = true
      error.price = "Digite um preço"
    }

    if(!description){
      newFieldError.description = true
      error.description = "Digite uma descrição"
    }
    if(!color){
      newFieldError.color = true
      error.color = "Digite uma cor"
    }
    

    if(title.length<4){
      newFieldError.title = true
      error.title = "Digite 4 ou mais caracteres"
    }
    if(title.length>40){
      newFieldError.title = true
      error.title = "Digite no maximo 40 caracteres"
    }
    if(description.length<20){
      newFieldError.description = true
      error.description = "Digite 20 ou mais caracteres"
    }
    if(description.length>300){
      newFieldError.description = true
      error.description = "Digite no maximo 300 caracteres"
    }
    if(color.length<3){
      newFieldError.color = true
      error.color = "Digite 3 ou mais caracteres"
    }
    if(color.length>20){
      newFieldError.color = true
      error.color = "Digite no maximo 20 caracteres"
    }
    if(status.length>50){
      newFieldError.status = true
      error.status = "Digite no maximo 50 caracteres"
    }
    if(status.length<3){
      newFieldError.status = true
      error.status = "Digite 3 ou mais caracteres"
    }
    


    if(Number(year)<1950||Number(year)>dayjs().year()){
      newFieldError.year = true
      error.year = "Digite um ano válido"
    }
    if(Number(price)<=0||Number(price)>1500000){
      newFieldError.price = true
      error.price = "Digite um preço maior que 0 e menor que 1.500.000,00"
    }
    if(Number(size)<=0||Number(size)>50){
      newFieldError.size = true
      error.size = "Digite um tamanho maior que 0 e menor que 50"
    }
    if(Number(section)<2||Number(section)>9){
      newFieldError.section = true
      error.section = "Digite a quantia de eixos válida"
    }


    if(wheelsSelected==="Selecione uma opção"){
      newFieldError.wheelsSelected = true
      error.wheelsSelected = "Selecione uma opção é inválido"
    }
    if(typesSelected==="Selecione uma opção") {
      newFieldError.typesSelected = true
      error.typesSelected = "Selecione uma opção é inválido"
    }
    if(modelsSelected==="Selecione uma opção") {
      newFieldError.modelsSelected = true
      error.modelsSelected = "Selecione uma opção é inválido"
    }
    if(brandsSelected==="Selecione uma opção"){
      newFieldError.brandsSelected = true
      error.brandsSelected = "Selecione uma opção é inválido"
    }



    let foundError;
    for (let item of fields) {
      if(newFieldError[item]) foundError = true
    } 

    if (foundError) {
      setDisable(false)
      setErrorMessage({...error})
      setFieldError({...newFieldError})
      return
    }
    
    

    
    const dataMain = new FormData()
    const dataSecond = new FormData()

    dataMain.append("main", main)
    secondary.forEach((e) =>{
      dataSecond.append("secondary", e)
    })
  
    try{
      const mainImage = await postCartPhotosMain(dataMain, userData.token)
      const secondaryImages = await postCartPhotosSecondary(dataSecond, userData.token)
      

      console.log( {
        brand_id: brandsSelected,
        type_id: typesSelected,
        wheel_id: wheelsSelected,
        model_id: modelsSelected,
      })

      await postCart( {
        description: description,
        size: Number(size),
        color: color,
        title: title,
        brand_id: brandsSelected,
        type_id: typesSelected,
        wheel_id: wheelsSelected,
        model_id: modelsSelected,
        price: Number(price),
        main_image: mainImage.main,
        secondary_images: secondaryImages.secondary,
        sections: Number(section),
        year : Number(year),
        status: status

      },userData.token)

      setTitle("")
      setDescription("")
      setColor("")
      setSize(0)
      setPrice(0)
      setSection(0)
      setMain({})
      setSecondary([])
      setYear(0)
      setStatus("")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={`${style.father} ${roboto.className}`}>
      <h1>Loque sua carreta</h1>

      <form onSubmit={(e) => handlePost(e)}>
        <section>
          <div className={style.first}>
            <h2>Título</h2>
            <input disabled={disable} placeholder="Título" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            {fieldError.title ? <p className={style.p}>{errorMessage.title}</p>:<div className={style.space}></div>}
            <h2>Cor</h2>
            <input disabled={disable} placeholder="Cor" type="text" onChange={(e) => setColor(e.target.value)} value={color} />
            {fieldError.color ? <p className={style.p}>{errorMessage.color}</p>:<div className={style.space}></div>}
            <h2>Tamanho</h2>
            <input disabled={disable} placeholder="Tamanho" type="number" onChange={(e) => setSize(Number(e.target.value))} value={size} />
            {fieldError.size ? <p className={style.p}>{errorMessage.size}</p>:<div className={style.space}></div>}
            <h2>Valor Estimado</h2>
            <input disabled={disable} placeholder="Valor" type="number" onChange={(e) => setPrice(Number(e.target.value))}  value={price}/>
            {fieldError.price ? <p className={style.p}>{errorMessage.price}</p>:<div className={style.space}></div>}
            <h2>Ano</h2>
            <input disabled={disable} placeholder="Ano" type="number" onChange={(e) => setYear(Number(e.target.value))} value={year} />
            {fieldError.year ? <p className={style.p}>{errorMessage.year}</p>:<div className={style.space}></div>}
            <h2>Eixos</h2>
            <input disabled={disable} placeholder="Eixos" type="number" onChange={(e) => setSection(Number(e.target.value))} value={section} />
            {fieldError.section ? <p className={style.p}>{errorMessage.section}</p>:<div className={style.space}></div>}
            <h2>Status</h2>
            <input disabled={disable} placeholder="Status" type="text" onChange={(e) => setStatus(e.target.value)} value={status} />
            {fieldError.status ? <p className={style.p}>{errorMessage.status}</p>:<div className={style.space}></div>}
            <CartInput disable={disable} type={brands} alter={setBrandsSelected} value={brandsSelected} label="Marca"/>
            {fieldError.brandsSelected ? <p className={style.p}>{errorMessage.brandsSelected}</p>:<div className={style.space}></div>}
            <CartInput disable={disable} type={types} alter={setTypesSelected} value={typesSelected} label="Tipo"/>
            {fieldError.typesSelected ? <p className={style.p}>{errorMessage.typesSelected}</p>:<div className={style.space}></div>}
            <CartInput disable={disable} type={models} alter={setModelsSelected} value={modelsSelected} label="Modelo"/>
            {fieldError.modelsSelected ? <p className={style.p}>{errorMessage.modelsSelected}</p>:<div className={style.space}></div>}
            <CartInput disable={disable} type={wheels} alter={setWheelsSelected} value={wheelsSelected} label="Tipo de Roda"/>
            {fieldError.wheelsSelected ? <p className={style.p}>{errorMessage.wheelsSelected}</p>:<div className={style.space}></div>}
            <textarea placeholder="Observações" onChange={(e) => setDescription(e.target.value)} value={description} />
            {fieldError.description ? <p className={style.p}>{errorMessage.description}</p>:<div className={style.space}></div>}
          </div>
          <div className={style.second}>
            <input disabled={disable} type="file" name="main" onChange={(e) => {if(e.target.files) { setMain(e.target.files[0])}}}/>
            {fieldError.main ? <p className={style.p}>{errorMessage.main}</p>:<div className={style.space}></div>}
            <input disabled={disable} type="file" name="secondary" onChange={(e) => {if(e.target.files) { 
              const temp  = secondary as any
              temp.push(e.target.files[e.target.files.length-1])
              setSecondary(temp)
            }}}/>
            {fieldError.secondary ? <p className={style.p}>{errorMessage.secondary}</p>:<div className={style.space}></div>}
          </div>
        </section>

        <button disabled={disable} type="submit"> Enviar </button>
      </form>
    </div>
  )
}
