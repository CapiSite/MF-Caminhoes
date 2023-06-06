import AdminContext from "@/APIContext/AdminContext";
import CardAdm from "@/Components/adm/CardAdm";
import Carousel from "@/Components/Carousel";
import CarroselLine from "@/Components/Carousel_line";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { getUnvalidCarts } from "@/services/cart.services";
import style from "@/styles/AdmStyle.module.css";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Adm() {
  const router = useRouter()

  const [carts, setCarts] = useState<[]>([])
  const [render, setRender] = useState<boolean>(false)

  const {adminData} = useContext(AdminContext) as any
  
  const handleCall = useCallback(async () => {
    try {
      const cartsReceived = await getUnvalidCarts(adminData)
      setCarts(cartsReceived)
    } catch (err: any) { }
  }, [])

  useEffect(() =>{
    if(adminData){
      handleCall()
      setRender(true)
    }
    else{
      router.push("/")
    }
  }, [])

  if (!render) {
    return (
      <>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={style.container}>
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
        <div className={style.title}>
          <h1>Carretas para aprovar</h1>
        </div>
        {carts.length===0?<div className={style.div}>
          <h1>Nenhuma carreta para aprovar</h1>
          <button onClick={()=>router.push("/")}>Voltar para a home
          </button>
        </div>:
        <>
        <div className={style.cards}>
          {carts.map((item, index) => (
            <CardAdm info={item} key={index}/>
          ))}
        </div>
        <div className={style.mobileCard}>
          <CarroselLine index={1} items={carts}/>
        </div>
        </>
        }
        
      </div>

      <Footer />
    </>
  )
}