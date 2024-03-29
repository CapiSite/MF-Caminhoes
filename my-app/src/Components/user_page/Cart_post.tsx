import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services"
import { FormEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import style from '@/styles/user_page/cart_rental.module.css'
import { roboto } from "@/styles/fonts"
import { postCart, postCartPhotosMain, postCartPhotosSecondary } from "@/services/cart.services"
import UserContext from "@/APIContext/UserContext"
import CartInput from "./Cart_input"
import dayjs from "dayjs"
import MaskedInput from "react-text-mask"
import CurrencyInput from "react-currency-input-field"
import styleModal from "@/styles/user_page/user_update.module.css";
import OptionContext from "@/APIContext/UserOption"
import { ImCancelCircle } from "react-icons/im";

export default function CartPost() {
  const [brands, setBrands] = useState<{ id: number, name: string }[]>([])
  const [types, setTypes] = useState<{ id: number, name: string }[]>([])
  const [models, setModels] = useState<{ id: number, name: string }[]>([])
  const [wheels, setWheels] = useState<{ id: number, name: string }[]>([])
  const mainImage = useRef<any>(null)
  const secondaryImage = useRef<any>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [size, setSize] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [brandsSelected, setBrandsSelected] = useState<string | number>("")
  const [typesSelected, setTypesSelected] = useState<string | number>("")
  const [modelsSelected, setModelsSelected] = useState<string | number>("")
  const [wheelsSelected, setWheelsSelected] = useState<string | number>("")
  const [section, setSection] = useState<number>()
  const [main, setMain] = useState<any>()
  const [secondary, setSecondary] = useState<any[]>([])
  const [year, setYear] = useState<number>()
  const [status, setStatus] = useState<number | null>(null)
  const [fieldError, setFieldError] = useState(() => ({ title: false, description: false, color: false, size: false, price: false, brandsSelected: false, typesSelected: false, modelsSelected: false, wheelsSelected: false, year: false, status: false, main: false, secondary: false, section: false }))
  const [errorMessage, setErrorMessage] = useState({ title: "Campo Obrigatório!", description: "Campo Obrigatório!", color: "Campo Obrigatório!", size: "Campo Obrigatório!", price: "Campo Obrigatório!", brandsSelected: "Campo Obrigatório!", typesSelected: "Campo Obrigatório!", modelsSelected: "Campo Obrigatório!", wheelsSelected: "Campo Obrigatório!", year: "Campo Obrigatório!", status: "Campo Obrigatório!", main: "Insira uma imagem!", secondary: "Insira uma imagem!", section: "Campo Obrigatório!" })
  const [disable, setDisable] = useState(false)

  const { setOptionData } = useContext(OptionContext) as any
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
  }, [secondary, setSecondary])


  useEffect(() => {
    handleCall()
  }, [secondary, setSecondary])

  async function handlePost(e: FormEvent) {
    e.preventDefault()
    const fields = ["title", "description", "color", "size", "price", "brandsSelecte", "typesSelected", "modelsSelected", "wheelsSelected", "year", "status", "main", "secondary", "section",]
    let error = { title: "Campo Obrigatório!", description: "Campo Obrigatório!", color: "Campo Obrigatório!", size: "Campo Obrigatório!", price: "Campo Obrigatório!", brandsSelected: "Campo Obrigatório!", typesSelected: "Campo Obrigatório!", modelsSelected: "Campo Obrigatório!", wheelsSelected: "Campo Obrigatório!", year: "Campo Obrigatório!", status: "Campo Obrigatório!", main: "Insira uma imagem!", secondary: "Insira uma imagem!", section: "Campo Obrigatório!" }
    let newFieldError: any = { title: false, description: false, color: false, size: false, price: false, brandsSelected: false, typesSelected: false, modelsSelected: false, wheelsSelected: false, year: false, status: false, main: false, secondary: false, section: false };
    setDisable(true)

    if (!title) {
      newFieldError.title = true
      error.title = "Digite uma título"
    }
    if (!typesSelected) {
      newFieldError.typesSelected = true
      error.typesSelected = "Selecione um tipo de veiculo"
    }
    if (!modelsSelected) {
      newFieldError.modelsSelected = true
      error.modelsSelected = "Selecione um modelo"
    }
    if (!wheelsSelected) {
      newFieldError.wheelsSelected = true
      error.wheelsSelected = "Selecione o tipo de roda"
    }
    if (!brandsSelected) {
      newFieldError.brandsSelected = true
      error.brandsSelected = "Selecione uma marca"
    }
    if (!year) {
      newFieldError.year = true
      error.year = "Digite um Ano"
    }
    if (!status) {
      newFieldError.status = true
      error.status = "Digite um status"
    }
    if (!main) {
      newFieldError.main = true
      error.main = "Insira uma imagem principal"
    }

    if (secondary.length < 1) {
      newFieldError.secondary = true
      error.secondary = "Insira uma segunda imagem"
    }
    if (!section) {
      newFieldError.section = true
      error.section = "Digite a quantia de eixos"
    }
    if (!size) {
      newFieldError.size = true
      error.size = "Digite um tamanho"
    }
    if (!price) {
      newFieldError.price = true
      error.price = "Digite um preço"
    }

    if (!description) {
      newFieldError.description = true
      error.description = "Digite uma descrição"
    }
    if (!color) {
      newFieldError.color = true
      error.color = "Digite uma cor"
    }


    if (title.length < 4) {
      newFieldError.title = true
      error.title = "Digite 4 ou mais caracteres"
    }
    if (title.length > 60) {
      newFieldError.title = true
      error.title = "Digite no maximo 60 caracteres"
    }
    if (description.length < 20) {
      newFieldError.description = true
      error.description = "Digite 20 ou mais caracteres"
    }
    if (description.length > 1000) {
      newFieldError.description = true
      error.description = "Digite no maximo 1000 caracteres"
    }
    if (color.length < 3) {
      newFieldError.color = true
      error.color = "Digite 3 ou mais caracteres"
    }
    if (color.length > 20) {
      newFieldError.color = true
      error.color = "Digite no maximo 20 caracteres"
    }
    if (typeof (status) !== "number") {
      newFieldError.status = true
      error.status = "Digite número de dias válido"
    }
    if (typeof (status) === "number" && status < 1) {
      newFieldError.status = true
      error.status = "Tempo Mínimo 'de 1 dias"
    }



    if (Number(year) < 1950 || Number(year) > dayjs().year()) {
      newFieldError.year = true
      error.year = "Digite um ano válido"
    }
    if (Number(price) <= 0 || Number(price) > 150000000) {
      newFieldError.price = true
      error.price = "Digite um preço maior que 0 e menor que 1.500.000"
    }
    if (size.includes(".")) {
      size.replace(".", "")
    }
    if (Number(size) <= 100 || Number(size) > 5000) {
      newFieldError.size = true
      error.size = "Digite um tamanho maior que 1 e menor que 50"
    }
    if (Number(section) < 2 || Number(section) > 9) {
      newFieldError.section = true
      error.section = "Digite a quantia de eixos válida"
    }


    if (wheelsSelected === "Selecione uma opção") {
      newFieldError.wheelsSelected = true
      error.wheelsSelected = "Selecione uma opção é inválido"
    }
    if (typesSelected === "Selecione uma opção") {
      newFieldError.typesSelected = true
      error.typesSelected = "Selecione uma opção é inválido"
    }
    if (modelsSelected === "Selecione uma opção") {
      newFieldError.modelsSelected = true
      error.modelsSelected = "Selecione uma opção é inválido"
    }
    if (brandsSelected === "Selecione uma opção") {
      newFieldError.brandsSelected = true
      error.brandsSelected = "Selecione uma opção é inválido"
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

    const dataMain = new FormData()
    const dataSecond = new FormData()

    dataMain.append("main", main)
    secondary.forEach((e) => {
      dataSecond.append("secondary", e)
    })

    try {
      const mainImage = await postCartPhotosMain(dataMain, userData.token)
      const secondaryImages = await postCartPhotosSecondary(dataSecond, userData.token)

      await postCart({
        description: description,
        size: Number(size),
        color: color,
        title: title,
        brand_id: brandsSelected,
        type_id: typesSelected,
        wheel_id: wheelsSelected,
        model_id: modelsSelected,
        price: Number(price * 100),
        main_image: mainImage.main,
        secondary_images: secondaryImages.secondary,
        sections: Number(section),
        year: Number(year),
        status: String(status)

      }, userData.token)

      setTitle("")
      setDescription("")
      setColor("")
      setSize("")
      setPrice(0)
      setSection(0)
      setYear(0)
      setStatus(null)

      setFieldError({ title: false, description: false, color: false, size: false, price: false, brandsSelected: false, typesSelected: false, modelsSelected: false, wheelsSelected: false, year: false, status: false, main: false, secondary: false, section: false })
    } catch (err) {
    }
  }

  function handleImageShow(e: any) {
    if (e.target.files) {
      setMain(e.target.files[0])
    }
  }

  return (
    <div className={`${style.father} ${roboto.className}`}>
      {disable &&
        <div className={styleModal.modal}>
          <h1>Carreta enviada para análise</h1>
          <p>Sua carreta foi enviada para análise, você pode ver ela na sessão Minhas Carretas, caso ela seja reprovada, você será avisado por lá.</p>
          <div>
            <button className={styleModal.ok} onClick={() => { setDisable(false), setOptionData(1) }}>Ok</button>
          </div>

        </div>}
      <h1>Loque sua carreta</h1>

      <form onSubmit={(e) => handlePost(e)}>
        <section>
          <div className={style.first}>
            <h2>Título</h2>
            <input disabled={disable} placeholder="Título" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            {fieldError.title ? <p className={style.p}>{errorMessage.title}</p> : <div className={style.space}></div>}

            <h2>Cor</h2>
            <input disabled={disable} placeholder="Cor" type="text" onChange={(e) => setColor(e.target.value)} value={color} />
            {fieldError.color ? <p className={style.p}>{errorMessage.color}</p> : <div className={style.space}></div>}

            <h2>Comprimento</h2>
            <MaskedInput defaultValue={""} className={style.input} mask={[/[0-9]/, /\d/, ",", /\d/, /\d/, " Metros"]} value={size}
              onChange={(e) => setSize(e.target.value.replace(/[^\d]/g, ""))} placeholder="Comprimento" disabled={disable} />
            {fieldError.size ? <p className={style.p}>{errorMessage.size}</p> : <div className={style.space}></div>}

            <h2>Valor Estimado</h2>
            <CurrencyInput placeholder="Valor Estimado" disabled={disable} intlConfig={{ locale: 'pt-br', currency: 'BRL' }} value={price}
              onChange={(e) => { setPrice(Number(e.target.value.replace(/[^\d]/g, ""))) }} />
            {fieldError.price ? <p className={style.p}>{errorMessage.price}</p> : <div className={style.space}></div>}

            <h2>Ano</h2>
            <MaskedInput defaultValue={""} className={style.input} mask={[/[1-2]/, /\d/, /\d/, /\d/]} value={year}
              onChange={(e) => setYear(Number(e.target.value.replace(/[^\d]/g, "")))} placeholder="Ano" disabled={disable} />
            {fieldError.year ? <p className={style.p}>{errorMessage.year}</p> : <div className={style.space}></div>}

            <h2>Eixos</h2>
            <MaskedInput defaultValue={""} className={style.input} mask={[/[1-9]/, " Eixos"]} value={section}
              onChange={(e) => setSection(Number(e.target.value.replace(/[^\d]/g, "")))} placeholder="Quantos Eixos" disabled={disable} />
            {fieldError.section ? <p className={style.p}>{errorMessage.section}</p> : <div className={style.space}></div>}

            <h2>Tempo Mínimo de Locação</h2>
            <input disabled={disable} placeholder="(em dias)" type="text"
              onChange={(e) => { if (!isNaN(Number(e.target.value))) { setStatus(Number(e.target.value)) } }} value={status ? status : ""} />
            {fieldError.status ? <p className={style.p}>{errorMessage.status}</p> : <div className={style.space}></div>}

            <CartInput disable={disable} type={brands} alter={setBrandsSelected} value={brandsSelected} label="Marca" />
            {fieldError.brandsSelected ? <p className={style.p}>{errorMessage.brandsSelected}</p> : <div className={style.space}></div>}
            <CartInput disable={disable} type={types} alter={setTypesSelected} value={typesSelected} label="Tipo" />
            {fieldError.typesSelected ? <p className={style.p}>{errorMessage.typesSelected}</p> : <div className={style.space}></div>}
            <CartInput disable={disable} type={models} alter={setModelsSelected} value={modelsSelected} label="Modelo" />
            {fieldError.modelsSelected ? <p className={style.p}>{errorMessage.modelsSelected}</p> : <div className={style.space}></div>}
            <CartInput disable={disable} type={wheels} alter={setWheelsSelected} value={wheelsSelected} label="Tipo de Roda" />
            {fieldError.wheelsSelected ? <p className={style.p}>{errorMessage.wheelsSelected}</p> : <div className={style.space}></div>}
            <textarea disabled={disable} placeholder="Observações" onChange={(e) => setDescription(e.target.value)} value={description} />
            {fieldError.description ? <p className={style.p}>{errorMessage.description}</p> : <div className={style.space}></div>}
          </div>

          <div className={style.second}>
            <label className={style.label} onClick={() => mainImage.current.click()}>Insira a imagem principal</label>
            <input className={style.input} ref={mainImage} disabled={disable} accept="image/png, image/gif, image/jpeg" type="file" name="main" onChange={(e) => handleImageShow(e)} />
            {fieldError.main && <p className={style.p}>{errorMessage.main}</p>}
            {main && <span className={style.span}>Imagem colocada!</span>}
            <img src={main ? URL.createObjectURL(main as Blob) : ""} />

            <label className={style.label} onClick={() => secondaryImage.current.click()}>Insira as imagens secundárias</label>
            <input className={style.input} ref={secondaryImage} disabled={disable} accept="image/png, image/gif, image/jpeg" type="file" multiple={true} name="secondary" onChange={(e: any) => {
              if (e.target.files) {
                const additional = [... secondary]
                for(let i = 0; i < e.target.files.length; i++){
                  additional.push(e.target.files[i])
                }
                setSecondary(additional)
              }
            }} />
            {secondary.length !== 0 && <span className={style.span}>Imagens colocadas: {secondary.length}</span>}
            {fieldError.secondary ? <p className={style.p}>{errorMessage.secondary}</p> : <div className={style.space}></div>}
            {secondary.length > 0 ?
              secondary.map((e, index) => {
                return (
                  <div key={index}>
                    <ImCancelCircle onClick={()=> setSecondary(secondary.filter((e,thisIndex) => thisIndex !== index) )}/>
                    <img src={e ? URL.createObjectURL(e as Blob) : ""} key={index} />
                  </div>                
                )
              })
              :
              <img src={""}/>
            }
          </div>
        </section>

        <button disabled={disable} type="submit"> Enviar </button>
      </form>
    </div>
  )
}
