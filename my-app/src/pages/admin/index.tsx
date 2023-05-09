import CardAdm from "@/Components/CardAdm";
import Carousel from "@/Components/Carousel";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import style from "@/styles/AdmStyle.module.css";
import Image from "next/image";

const carrosel = ["Caminhão 1", "Caminhão 2", "Caminhão 3", "Caminhão 4", "Caminhão 5", "Caminhão 6", "Caminhão 7", "Caminhão 8", "Caminhão 9", "Caminhão 10"]

export default function Adm(){
    return(
        <>
        <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
        <div className={style.container}>
          <div className={style.title}>
            <h1>Carretas para aprovar</h1>
          </div>
            
            <div className={style.cards}>
            {carrosel.map((item, index) => (
              <CardAdm/>
            ))}
            </div>
            <div className={style.mobileCard}>
            {carrosel.map((item, index) => (
              <Carousel item={item} 
             adm={true} key={index}/>
            ))}
            </div>
        </div>


      <Footer/>
        </>
    )
}