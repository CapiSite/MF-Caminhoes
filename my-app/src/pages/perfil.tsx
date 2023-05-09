import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import CartPost from "@/Components/user_page.tsx/Cart_post";
import MyCarts from "@/Components/user_page.tsx/My_Carts";
import NavOptions from "@/Components/user_page.tsx/Nav_options";
import UserUpdate from "@/Components/user_page.tsx/User_update";
import { FormEvent, useState, useContext, useEffect } from 'react'
import style from '@/styles/user_page/page.module.css'
import UserContext from "@/APIContext/UserContext";
import AlertMessage from "@/Components/user_page.tsx/Alert_message";
import Sidebar from "@/Components/Sidebar";

export default function userArea() {
  const [selection, setSelection] = useState<number>(0)
  const [error, setError] = useState<number>(0)

  const { userData } = useContext(UserContext) as { userData: any }

  useEffect(() => {
    if (!userData) {
      setError(1)
    }
  }, [userData])

  return (
    <>
      <div className={style.header}>
        <Header/>
      </div>
      <div className={style.sidebar}>
        <Sidebar/>
      </div>
      <div className={style.father}>

        <NavOptions subsets={["Loque minha Carreta", "Minhas Carretas", "Meu perfil",]} select={setSelection} />

        {error === 1 ?
          <AlertMessage /> :
          selection === 0 ?
            <CartPost /> : selection === 1 ?
              <MyCarts /> : selection === 2 ?
                <UserUpdate /> : null
        }
      </div>

      <Footer />
    </>
  )
}