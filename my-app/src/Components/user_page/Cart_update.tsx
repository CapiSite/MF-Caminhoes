import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import styleForm from '@/styles/user_page/cart_rental.module.css'
import { roboto } from "@/styles/fonts"
import { postCart, postCartPhotosMain, postCartPhotosSecondary, updateCart } from "@/services/cart.services"
import UserContext from "@/APIContext/UserContext"
import CartInput from "./Cart_input"

export default function CartUpdate({info, changeInfo, disableThis} : any) { 

  const [brands, setBrands] = useState<{ id: number, name: string }[] >([])
  const [types, setTypes] = useState<{ id: number, name: string }[]>([])
  const [models, setModels] = useState<{ id: number, name: string }[]>([])
  const [wheels, setWheels] = useState<{ id: number, name: string }[]>([])

  const [title, setTitle] = useState<string>(info.title)
  const [description, setDescription] = useState<string>(info.description)
  const [color, setColor] = useState<string>(info.color)
  const [size, setSize] = useState<number>(info.size)
  const [price, setPrice] = useState<number>(info.price)
  const [brandsSelected, setBrandsSelected] = useState<string | number>("")
  const [typesSelected, setTypesSelected] = useState<string | number>("")
  const [modelsSelected, setModelsSelected] = useState<string | number>("")
  const [wheelsSelected, setWheelsSelected] = useState<string | number>("")
  const [section, setSection] = useState<number>(info.sections)
  const [main, setMain] = useState<any>()
  const [secondary, setSecondary] = useState<[]>([])
  const [year, setYear] = useState<number>(info.year)
  const [status, setStatus] = useState<string>(info.status)

  const { userData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const brands = await getBrands()
      setBrands(brands)

      const types = await getTypes()
      setTypes(types)

      const models = await getModels()
      setModels(models)

      const wheels = await getWheels()
      setWheels(wheels)

      setBrandsSelected(info.brand_id)

    } catch (err: any) { }
  }, [])


  useEffect(() => {
    handleCall()
  }, [])

  async function handlePost(e: FormEvent) {
    e.preventDefault()

    const dataMain = new FormData()
    const dataSecond = new FormData()

    
    dataMain.append("main", main)
    secondary.forEach((e) =>{
      dataSecond.append("secondary", e)
    })
  
    try{
      const mainImage = await postCartPhotosMain(dataMain, userData.token)
      const secondaryImages = await postCartPhotosSecondary(dataSecond, userData.token)

      const cart = await updateCart( {
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

      }, info.id, userData.token)

      changeInfo.setRender(!changeInfo.render)
      disableThis(null)
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
    }
  }

  return (
    <div className={`${styleForm.father} ${roboto.className}`}>
      <h1>Loque sua carreta</h1>

      <form onSubmit={(e) => handlePost(e)}>
        <section>
          <div className={styleForm.first}>
            <h2>Título</h2>
            <input placeholder="Título" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

            <h2>Cor</h2>
            <input placeholder="Cor" type="text" onChange={(e) => setColor(e.target.value)} value={color} />

            <h2>Tamanho</h2>
            <input placeholder="Tamanho" type="number" onChange={(e) => setSize(Number(e.target.value))}  value={size}/>

            <h2>Valor Estimado</h2>
            <input placeholder="Valor" type="number" onChange={(e) => setPrice(Number(e.target.value))}  value={price}/>

            <h2>Ano</h2>
            <input placeholder="Ano" type="number" onChange={(e) => setYear(Number(e.target.value))} value={year} />

            <h2>Eixos</h2>
            <input placeholder="Eixos" type="number" onChange={(e) => setSection(Number(e.target.value))} value={section} />

            <h2>Status</h2>
            <input placeholder="Status" type="text" onChange={(e) => setStatus(e.target.value)} value={status} />

            <CartInput type={brands} alter={setBrandsSelected} value={brandsSelected} label="Marca" disable={false}/>
            <CartInput type={types} alter={setTypesSelected} value={typesSelected} label="Tipo" disable={false}/>
            <CartInput type={models} alter={setModelsSelected} value={modelsSelected} label="Modelo" disable={false}/>
            <CartInput type={wheels} alter={setWheelsSelected} value={wheelsSelected} label="Tipo de Roda" disable={false}/>


            <textarea placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className={styleForm.second}>
            <input type="file" name="main" onChange={(e) => {if(e.target.files) { setMain(e.target.files[0])}}}/>
            <input type="file" name="secondary" onChange={(e) => {if(e.target.files) { 
              const temp  = secondary as any
              temp.push(e.target.files[e.target.files.length-1])
              setSecondary(temp)
            }}}/>
          </div>
        </section>

        <button type="submit"> Enviar </button>
      </form>
    </div>
  )
}