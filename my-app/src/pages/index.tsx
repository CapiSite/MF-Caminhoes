import Image from "next/image";
import Banner from "@/../public/banner2.jpg";
import BannerMobile from "@/../public/banner-mobile.png";
import style from "../styles/HomeStyle.module.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Sidebar from "@/Components/Sidebar";
import Carousel from "@/Components/Carousel";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { getAllCarts } from "@/services/cart.services";
import { AxiosError } from "axios";
import { AiOutlineClose } from "react-icons/ai";
import UserContext from "@/APIContext/UserContext";
import AdminContext from "@/APIContext/AdminContext";
import { verifyToken } from "@/services/user-services";
import { toast } from "react-toastify";
import { addInfo } from "@/services/info.service";
import AddedContext from "@/APIContext/addedContext";

export default function Home() {
  const [carrosel, setCarrosel] = useState([])
  const [model, setModel] = useState<boolean>(true)
  const [userName, setUserName] = useState<any>();

  const [adminOn, setAdminOn] = useState<any>(false)
  const [userInfo, setUserinfo] = useState<boolean>(false);
  const [addedInfo, setAdded] = useState<Boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [name, setName] = useState<string>("")

  const { userData } = useContext(UserContext) as any;
  const { adminData } = useContext(AdminContext) as any
  const { addedData, setAddedData } = useContext(AddedContext) as any

  const handleCall = useCallback(async () => {
    try {
      const cartsReceived = await getAllCarts()
      setCarrosel(cartsReceived)
      if (userData) {
        await verifyToken(userData.token);
        setUserName(userData.user.name);
        setUserinfo(true)
      }
      if (adminData) {
        setAdminOn(true)
      }
      if (addedData) {
        setAdded(true)
      }
    } catch (err) {
      const error = err as AxiosError
    }

  }, [])


  useEffect(() => {
    handleCall()
  }, [])

  async function addInfoPost(e: FormEvent) {
    e.preventDefault()

    try {
      await addInfo({ name, email, phone })
      setAddedData(null)
    } catch (err: any) {
      if (err?.response?.status === 400) {
        toast.warn('Verifique os dados inseridos')
      }
      if (err?.response?.status === 409) {
        toast.warn(err.response.data.message)
      }
    }
  }

  return (
    <div>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      {model && !adminOn && !userInfo && addedInfo &&
        <div className={style.model}>

          <div className={style.modelLeft}>
            <h1>Tenha acesso a promoções, notícias e ofertas especiais cadastrando seu email!</h1>

            <form onSubmit={(e) => addInfoPost(e)}>
              <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}></input>
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
              <button type="submit">Quero receber promoções, notícias e muito mais!</button>
            </form>
          </div>

          <div className={style.modelRight}>
            <h1>Alugue o veículo ou máquina que você precisa em apenas alguns cliques!</h1>
            <p>Cadastre seu email para ter acesso aos melhores descontos, promoções, ofertas especiais e muito mais!</p>
            <p>Com seu email cadastrado, entraremos em contato com você levando as melhores noticias, descontos, promoções e ofertas do seu interesse!
            </p>
            <AiOutlineClose onClick={() => setModel(false)} />
          </div>
        </div>
      }

      <main className={style.main}>
        <div className={style.center}>
          <Image className={style.banner} src={Banner} alt="Banner" />
          <Image
            className={style.banner_mobile}
            src={BannerMobile}
            alt="Banner-Mobile"
          />
          <div className={style.carousel}>

            {carrosel.map((item, index) => (
              <Carousel info={item} key={index} />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
