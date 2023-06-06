import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import Photos from "@/Components/Photos"
import Sidebar from "@/Components/Sidebar"
import style from "@/styles/LocationsById.module.css"
import styleError from "@/styles/error.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"
import { deleteAnyCart, getSpecificCart, validateCart } from "@/services/cart.services"
import { roboto } from "@/styles/fonts"
import AdminContext from "@/APIContext/AdminContext"

export default function ProductLocation() {
  const router = useRouter()

  const [mainImage, setMainImage] = useState("")
  const [error, setError] = useState<boolean>(true)
  const [info, setInfo] = useState<any>()
  const [render, setRender] = useState<boolean>(false)

  const { adminData } = useContext(AdminContext) as any

  const [src, setSrc] = useState<null | string>(null)

  const handleCall = useCallback(async () => {
    if (typeof (router.query.id) === "string") {
      setError(false)
      try {
        const infoReceived = await getSpecificCart(parseInt(router.query.id as string))

        if (infoReceived.main_image) {
          fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}images/main/${infoReceived.main_image}`)
            .then((response) => response.blob())
            .then((blob) => {
              const imageUrl = URL.createObjectURL(blob);
              setMainImage(imageUrl)
              setSrc(imageUrl);
              setRender(true)
            })
            .catch((err) => {
              setError(true)
              setRender(true)
            })
        }
        infoReceived.description = infoReceived.description.split("\n").filter((e: string) => e !== "")

        setInfo(infoReceived)
      } catch (err: any) {
        setError(true)
        setRender(true)
      }
    }
  }, [router])

  useEffect(() => {

    if (adminData) {
      handleCall()
    }
    else {
      router.push("/")
    }
  }, [router])

  async function validateCartPost() {
    try {
      await validateCart(info.id, adminData)
      router.push("/admin")
    } catch (err) {

    }
  }

  async function unvalidateCartPost() {
    try {
      await deleteAnyCart(info.id, adminData)
      router.push("/admin")
    } catch (err) {

    }
  }

  if (!render) {
    return (
      <>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={`${styleError.father} ${roboto.className}`}>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={`${styleError.father} ${roboto.className}`}>
          <h1>Carreta não encontrada</h1>
          <h2>Por favor, tente mais tarde</h2>
          <button onClick={() => router.push("/admin")}>Voltar</button>
        </div>

        <Footer />
      </>
    )
  }
  else {

    return (
      <>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={style.container}>
          <div className={style.allImages}>
            <div className={style.images}>
              {src ?
                <Image src={src} onClick={() => setMainImage(src)} onError={() => setSrc("/men. erro.png")} alt="Imagem não encontrada" width={500} height={500} />
                : null}
              {info ?
                info.cart_images.map((o: any, i: any) => <Photos image={o.src} key={i} setMainImage={setMainImage} />)
                : null}
            </div>
            <Image src={mainImage} onError={() => setMainImage("/men. erro.png")} alt="Imagem não encontrada" width={500} height={500} />
          </div>
          <div className={style.info}>
            {info ?
              <>
                <h1>{info.title}</h1>
                <div className={style.specifications}>
                  <div><p>Detalhes do veículo:</p></div>
                  <div><p>Tipo: {info.cart_type.name}</p></div>
                  <div><p>Marca: {info.brands.name}</p></div>
                  <div><p>Modelo: {info.cart_model.name}</p></div>
                  <div><p>Tipo de Roda: {info.wheel.name}</p></div>
                  <div><p>Cor: {info.color}</p></div>
                  <div><p>Ano: 2021</p></div>
                  <div><p>Eixos: {info.sections}</p></div>
                  <div><p>Status: Novo</p></div>
                  <div><p>Observações:</p></div>
                  {info.description.map((e: string) => {
                    return <p> {e}</p>
                  })}
                </div>
                <p>R$: {parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
                <div className={style.button}>
                  <button onClick={() => validateCartPost()}>Aprovar</button>
                  <button onClick={() => unvalidateCartPost()}>Reprovar</button>
                </div>
              </>
              : null}
          </div>

        </div>
        <Footer />
      </>

    )
  }
}