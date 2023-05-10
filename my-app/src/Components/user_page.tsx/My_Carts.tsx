import UserContext from "@/APIContext/UserContext"
import { getMyCarts } from "@/services/cart.services"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import CartBlock from "./Cart_block";
import CartUpdate from "./Cart_update";

export default function MyCarts() {
  const [cartsInfo, setCarts] = useState<[]>([])
  const [cardSelected, setSelected] = useState<{} | null>()
  const [render, setRender] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const carts = await getMyCarts(userData.token)
      setCarts(carts)
    } catch (err: any) { 
      console.log(err)
    }
  }, [])

  useEffect(() => {
    handleCall()
  }, [render])

  return (
    <div>
      <div>
        { cartsInfo ? cartsInfo.map((e) =><CartBlock info={e} select={setSelected}/>): null}
      </div>
      <div>
        {cardSelected? <CartUpdate info={cardSelected} changeInfo={{render, setRender}} disableThis={setSelected}/> : null}
      </div>
    </div>
  )
}
