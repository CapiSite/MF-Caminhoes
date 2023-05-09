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

const carrosel = ["Caminhão 1", "Caminhão 2", "Caminhão 3", "Caminhão 4", "Caminhão 5", "Caminhão 6", "Caminhão 7", "Caminhão 8", "Caminhão 9", "Caminhão 10"]

export default function Home() {
  const router = useRouter();
  
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
              <Carousel item={item} key={index}/>
            ))}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
