import UserContext from "@/APIContext/UserContext"
import { getMyCarts } from "@/services/cart.services"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import CardUser from "./Card_user";
import MyCartsSection from "./Card_user";
import style from "@/styles/MyCarts.module.css";

export default function MyCarts() {
  const [cartsInfo, setCarts] = useState<[]>([])
  const [refusedCarts, setRefused] = useState([]) //Criar um novo tipo de card pra aqueles que foram rejeitados
  const [render, setRender] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const carts = await getMyCarts(userData.token)
      setCarts(carts.active)
      setRefused(carts.canceled)
    } catch (err: any) { 
      console.log(err)
    }
  }, [])

  useEffect(() => {
    handleCall()
  }, [render])

  return (
    <div>
      <div className={style.MyCarts}>
        { cartsInfo ?<MyCartsSection info={cartsInfo}/>: null}
      </div>
    </div>
  )
}
