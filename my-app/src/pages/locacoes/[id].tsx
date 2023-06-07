import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import Photos from "@/Components/Photos"
import Sidebar from "@/Components/Sidebar"
import style from "@/styles/LocationsById.module.css"
import styleError from "@/styles/error.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"
import { BsWhatsapp } from "react-icons/bs"
import { deleteAnyCart, getSpecificCart } from "@/services/cart.services"
import { roboto } from "@/styles/fonts"
import AdminContext from "@/APIContext/AdminContext"
import styleModal from "@/styles/user_page/user_update.module.css";
import { toast } from "react-toastify"
import { FaShareAlt } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { GrGooglePlus, GrFacebookOption } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion"

export default function ProductLocation() {
  const [deleter, setDeleter] = useState<any>(false)
  const { adminData } = useContext(AdminContext) as any
  const [error, setError] = useState<boolean>(true)
  const [info, setInfo] = useState<any>()
  const [modalUserInfo, setModalUserInfo] = useState(false)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const router = useRouter()
  const [src, setSrc] = useState<string | null>(null)
  const [share, setShare] = useState<boolean>(false)

  const handleCall = useCallback(async () => {

    if (router.query.id) {
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
            })
            .catch((err) => {
              setError(true)
            })
        }
        setInfo(infoReceived)
      } catch (err: any) {
        setError(true)
      }
    }
  }, [router])



  useEffect(() => {
    handleCall()
  }, [router])

  async function unvalidateCartPost() {
    try {
      await deleteAnyCart(info.id, adminData)
      router.push("/locacoes")
    } catch (err) {
      toast.warn("Aconteceu algum erro, tente mais tarde!")
    }
  }

  if (error) {
    return (
      <>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.sidebar}>
          <Sidebar locations={true} />
        </div>

        <div className={`${styleError.father} ${roboto.className}`}>
          <h1>Carreta não encontrada</h1>
          <h2>Por favor, tente mais tarde</h2>
          <button onClick={() => router.push("/locacoes")}>Voltar</button>
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <div className={style.header}>
        <Header locations={true} />
      </div>
      <div className={style.sidebar}>
        <Sidebar locations={true} />
      </div>

      <div className={style.container}>
        <div className={style.allImages}>
          <div className={style.images}>
            {src ?
              <Image src={src} onClick={() => setMainImage(src)} alt="Caminhão" width={500} height={500} />
              : null}

            {info ?
              info.cart_images.map((o: any, i: any) => <Photos image={o.src} key={i} setMainImage={setMainImage} />)
              : null}
          </div>

          {mainImage ?
            <Image src={mainImage} alt="Caminhão" width={500} height={500} />
            : null}


        </div>
        <div className={style.info}>
        
          {info ?
            <>
            
              <h1>{info.title}<FaShareAlt onClick={()=>setShare(!share)}/></h1>
              
              <div className={style.specifications}>
              
                
                <div>
                  <AnimatePresence>
                    {share &&
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.1}} className={style.share}>
                      <button><BsTwitter/></button>
                      <button><GrGooglePlus/></button>
                      <button><GrFacebookOption/></button>
                      <button><BsWhatsapp/></button>
                    </motion.div>
                    }
                  </AnimatePresence>

                <p>Detalhes do veículo:</p>
                </div>
                <div><p>Tipo: {info.cart_type.name}</p></div>
                <div><p>Marca: {info.brands.name}</p></div>
                <div><p>Modelo: {info.cart_model.name}</p></div>
                <div><p>Tipo de Roda: {info.wheel.name}</p></div>
                <div><p>Cor: {info.color}</p></div>
                <div><p>Ano: 2021</p></div>
                <div><p>Eixos: {info.sections}</p></div>
                <div><p>Status: Novo</p></div>
                <div><p>Observações:</p></div>
                <p>{info.description}</p>
              </div>
              <p>R$: {parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
              <Link href={`https://api.whatsapp.com/send?phone=5534992771000&text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atr%C3%A1ves%20do%20site%20LocaAqui!%20Quero%20saber%20a%20respeito%20da%20carreta:%20http://locaaqui.com/locacoes/${router.query.id}`} target="_blank"><button >Entre em contato!<BsWhatsapp /></button></Link>
              {adminData && <div className={style.delete}><button onClick={() => setDeleter(!deleter)}>Deletar carreta</button></div>}
              {adminData && <div className={style.modalUserInfo}><button onClick={() => setModalUserInfo(!modalUserInfo)}>Ver usuário</button></div>}
              {deleter &&
                <div className={styleModal.modal}>
                  <h1>Deseja mesmo deletar essa carreta?</h1>
                  <p>Essa carreta será excluída!</p>
                  <div className={styleModal.buttons}>
                    <button onClick={() => setDeleter(false)}>Não</button>
                    <button onClick={() => unvalidateCartPost()}>Sim</button>
                  </div>
                </div>}
              {modalUserInfo &&
                <div className={style.modalUser}>
                  <h1>Informações do usuário</h1>
                  <p>{info.users.email}</p>
                  <p>{info.users.name}</p>
                  <p>{info.users.phone}</p>
                  <div className={style.modalButton}>
                    <button onClick={() => setModalUserInfo(false)}>Fechar</button>
                  </div>
                </div>}
            </>
            : null}
        </div>

      </div>
      <Footer />
    </>

  )
}