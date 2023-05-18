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
  const [error, setError] = useState<boolean>(false)
  const [info, setInfo] = useState<any>()

  const { adminData } = useContext(AdminContext) as any

  const [src, setSrc] = useState("")

  const handleCall = useCallback(async () => {
    if (router.query.id === undefined) {
      setError(true)
    }

    if (typeof (router.query.id) === "string") {
      try {
        const infoReceived = await getSpecificCart(parseInt(router.query.id as string))
        fetch(`${process.env.NEXT_PUBLIC_REACT_BACK}/images/main/${info.main_image}`)
          .then((response) => response.blob())
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setSrc(imageUrl);
            setMainImage(imageUrl)
          });
        setInfo(infoReceived)
      } catch (err: any) {
      }
    }
  }, [])

  useEffect(() => {

    if (adminData) {
      handleCall()
    }
  }, [])

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
            <Image src={src} onClick={() => setMainImage(src)} alt="Caminhão" width={198} height={198} />
            {info ?
              info.cart_images.map((o: any, i: any) => <Photos image={o.src} key={i} setMainImage={setMainImage} />)
              : null}
          </div>
          <Image src={mainImage} alt="Caminhão" width={500} height={500} />
        </div>
        <div className={style.info}>
          {info ?
            <>
              <h1>{info.title}</h1>
              <div className={style.specifications}>
                <p>Detalhes do Veículo:</p>
                <p>Tipo: {info.cart_type.name}</p>
                <p>Marca: {info.brands.name}</p>
                <p>Modelo: {info.cart_model.name}</p>
                <p>Tipo de Roda: {info.wheel.name}</p>
                <p>Cor: {info.color}</p>
                <p>Ano: 2021</p>
                <p>Eixos: {info.sections}</p>
                <p>Status: Novo</p>
                <p>Observações: {info.description}</p>
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