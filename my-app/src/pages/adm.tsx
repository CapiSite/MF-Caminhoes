import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import style from "@/styles/AdmStyle.module.css";

export default function Adm(){
    return(
        <>
        <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
        <div>
            <h1>Carretas para aprovar</h1>
        </div>


      <Footer/>
        </>
    )
}