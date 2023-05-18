import Image from "next/image";
import Banner from "@/../public/banner2.jpg";
import BannerMobile from "@/../public/banner-mobile.png";
import style from "../styles/HomeStyle.module.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Sidebar from "@/Components/Sidebar";
import Carousel from "@/Components/Carousel";
import { useCallback, useEffect, useState } from "react";
import { getAllCarts } from "@/services/cart.services";
import { AxiosError } from "axios";

export default function Home() {
  const [carrosel, setCarrosel] = useState([])

  const handleCall = useCallback(async () => {
    try {
      const cartsReceived = await getAllCarts()
      setCarrosel(cartsReceived)

    } catch (err) {
      const error = err as AxiosError
    }

  }, [])


  useEffect(() => {
    handleCall()
  }, [])
  
  return (
    <div>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.model}>
        <div className={style.modelLeft}>
        <h1>Tenha acesso a promoções, notícias e ofertas especiais cadastrando seu email!</h1>
        <input placeholder="Nome"></input>
        <input placeholder="Email"></input>
        <button>Quero receber promoções, notícias e muito mais!</button>
        </div>
        <div className={style.modelRight}>
          <h1>alçskfjdlksaçjfklsajflkjdslkajflks</h1>
        </div>
      </div>
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
              <Carousel info={item} key={index}/>
            ))}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
