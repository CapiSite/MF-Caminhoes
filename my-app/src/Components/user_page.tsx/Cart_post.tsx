import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import style from '@/styles/user_page/cart_rental.module.css'
import { roboto } from "@/styles/fonts"
import { postCart } from "@/services/cart.services"
import UserContext from "@/APIContext/UserContext"

export default function CartPost() {
  const [brands, setBrands] = useState<{ id: number, name: string }[] >([])
  const [types, setTypes] = useState<{ id: number, name: string }[]>([])
  const [models, setModels] = useState<{ id: number, name: string }[]>([])
  const [wheels, setWheels] = useState<{ id: number, name: string }[]>([])

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [size, setSize] = useState<number>(0)
  const [brandsSelected, setBrandsSelected] = useState<string | number>("")
  const [typesSelected, setTypesSelected] = useState<string | number>("")
  const [modelsSelected, setModelsSelected] = useState<string | number>("")
  const [wheelsSelected, setWheelsSelected] = useState<string | number>("")
  const [main, setMain] = useState<any>()
  const [secondary, setSecondary] = useState<any>()

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

    const data = new FormData()
    data.append("title", title)
    data.append("color", color)
    data.append("size", String(size))
    data.append("description", description)
    data.append("main", main)
    data.append("secondary", secondary)

    try{
      await postCart(data, userData.token)
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
            <input placeholder="Temanho" type="number" onChange={(e) => setSize(Number(e.target.value))} value={size} />

            <CartInput type={brands} alter={setBrandsSelected} value={brandsSelected} label="Marca"/>
            <CartInput type={types} alter={setTypesSelected} value={typesSelected} label="Tipo"/>
            <CartInput type={models} alter={setModelsSelected} value={modelsSelected} label="Modelo"/>
            <CartInput type={wheels} alter={setWheelsSelected} value={wheelsSelected} label="Tipo de Roda"/>


            <textarea placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className={style.second}>
            <input type="file" name="main" onChange={(e) => setMain(e.target.files)}/>
            <input type="file" name="secondary" onChange={(e) => setSecondary(e.target.files)} multiple={true}/>
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