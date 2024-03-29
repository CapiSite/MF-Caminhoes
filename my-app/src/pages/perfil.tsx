import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import CartPost from "@/Components/user_page/Cart_post";
import MyCarts from "@/Components/user_page/My_Carts";
import NavOptions from "@/Components/user_page/Nav_options";
import UserUpdate from "@/Components/user_page/User_update";
import { FormEvent, useState, useContext, useEffect } from 'react'
import style from '@/styles/user_page/page.module.css'
import UserContext from "@/APIContext/UserContext";
import AlertMessage from "@/Components/user_page/Alert_message";
import Sidebar from "@/Components/Sidebar";
import OptionContext from "@/APIContext/UserOption";

export default function UserArea() {
  const [selection, setSelection] = useState<number>(0)
  const [error, setError] = useState<number>(0)
  const [render, setRender] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as { userData: any }
  const { optionData } = useContext(OptionContext) as any

  useEffect(() => {
    if (!userData) {
      setError(1)
    }
    setSelection(optionData)
    setRender(true)
  }, [userData, optionData])


  if (!render) {
    return (
      <div className={style.locationsCard}>
      </div>
    )
  }
  
  return (
    <>
      <div className={style.header}>
        <Header annunce={true}/>
      </div>
      <div className={style.sidebar}>
        <Sidebar annunce={true}/>
      </div>
      <div className={style.father}>

        <NavOptions subsets={["Cadastre seu veículo", "Meus veículos", "Meu perfil"]} key={0}/>

        {error === 1 ?
          <AlertMessage key={1} /> :
          selection === 0 ?
            <CartPost  key={2}/> : selection === 1 ?
              <MyCarts  key={3}/> : selection === 2 ?
                <UserUpdate  key={4}/> : null
        }
      </div>

      <Footer />
    </>
  )
}