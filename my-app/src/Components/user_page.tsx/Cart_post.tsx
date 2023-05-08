import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import style from '@/styles/user_page/cart_rental.module.css'
import { roboto } from "@/styles/fonts"
import { postCart, postCartPhotosMain, postCartPhotosSecondary } from "@/services/cart.services"
import UserContext from "@/APIContext/UserContext"

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
  const [main, setMain] = useState<any>()
  const [secondary, setSecondary] = useState<[]>([])

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
      await postCart( {
        description: description,
        size: Number(size),
        color: color,
        title: title,
        brand_id: Number(brandsSelected),
        type_id: Number(typesSelected),
        wheel_id: Number(wheelsSelected),
        model_id: Number(modelsSelected),
        price: Number(price),
        main_image: mainImage,
        secondary_images: secondaryImages
      },userData.token)

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
            <input placeholder="Título" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            <h2>Cor</h2>
            <input placeholder="Cor" type="text" onChange={(e) => setColor(e.target.value)} value={color} />
            <h2>Tamanho</h2>
            <input placeholder="Tamanho" type="number" onChange={(e) => setSize(Number(e.target.value))}  />

            <h2>Valor Dstimado</h2>
            <input placeholder="Valor" type="number" onChange={(e) => setPrice(Number(e.target.value))}  />

            <CartInput type={brands} alter={setBrandsSelected} value={brandsSelected} label="Marca"/>
            <CartInput type={types} alter={setTypesSelected} value={typesSelected} label="Tipo"/>
            <CartInput type={models} alter={setModelsSelected} value={modelsSelected} label="Modelo"/>
            <CartInput type={wheels} alter={setWheelsSelected} value={wheelsSelected} label="Tipo de Roda"/>


            <textarea placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className={style.second}>
            <input type="file" name="main" onChange={(e) => {if(e.target.files) { setMain(e.target.files[0])}}}/>
            <input type="file" name="secondary" onChange={(e) => {if(e.target.files) { 
              const temp  = secondary as any
              temp.push(e.target.files[e.target.files.length-1])
              console.log(temp)
              setSecondary(temp)
            }}}/>
          </div>
        </section>

        <button type="submit"> Enviar </button>
      </form>
    </div>
  )
}

function CartInput({ type, alter, value, label} : {type: any[], alter: any, value: string | number, label: string}) {
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <h2>{label}</h2>
      <select>
        {type ?
          type.map((e) => {
            return <option onClick={() =>{ alter(e.id); setActive(false)}}>{e.name}</option>
          })
          : null}
        <option onClick={() =>{ setActive(true); alter("")}}>Outros</option>
      </select>
      {active?
        <input placeholder="Nome" onChange={(e) => alter(e.target.value)} value={value}/>
      : null}
    </>
  )
}