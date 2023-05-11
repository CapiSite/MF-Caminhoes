import Image from "next/image";
import Banner from "@/../public/banner2.jpg";
import BannerMobile from "@/../public/banner-mobile.png";
import style from "../styles/HomeStyle.module.css";
import { useRouter } from "next/router";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Sidebar from "@/Components/Sidebar";
import Cards from "@/Components/Cards";
import Carousel from "@/Components/Carousel";
import { useCallback, useEffect, useState } from "react";
import { getAllCarts } from "@/services/cart.services";
import { AxiosError } from "axios";

export default function Home() {
  const [carrosel, setCarrosel] = useState([])

  const handleCall = useCallback(async () => {
    try {
      const cartsReceived = await getAllCarts()
      console.log(cartsReceived)
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
