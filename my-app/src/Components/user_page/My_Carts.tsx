import UserContext from "@/APIContext/UserContext"
import { getMyCarts } from "@/services/cart.services"
import { useCallback, useContext, useEffect, useState } from "react"
import MyCartsSection from "./Card_user";
import style from "@/styles/MyCarts.module.css";

export default function MyCarts() {
  const [cartsInfo, setCarts] = useState<string[]>(["nothing"])
  const [refusedCarts, setRefused] = useState<string[]>(["nothing"])
  const [render, setRender] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const carts = await getMyCarts(userData.token)
      setCarts(carts.active)
      setRefused(carts.canceled)
    } catch (err: any) { 
    }
  }, [])

  useEffect(() => {
    handleCall()
  }, [render])

  return (
    <div>
      <div className={style.MyCarts}>
        { cartsInfo ?<MyCartsSection info={cartsInfo} change={{render, setRender}} type={0}/>: null}
        { refusedCarts && refusedCarts.length > 0 ?<MyCartsSection info={refusedCarts} change={{render, setRender}} type={1}/>: null}
      </div>
    </div>
  )
}
