import UserContext from "@/APIContext/UserContext"
import { deleteMyCart } from "@/services/cart.services"
import Image from "next/image"
import { useContext, useState } from "react"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";


export default function CartBlock({info, select}: any) {
  const [confirm, setConfirm] = useState<boolean>(false)

  const { userData } = useContext(UserContext) as any


  async function deleteCartPost() {
    try {
      await deleteMyCart(info.id, userData.token)
    } catch (err: any) { 
      console.log(err)
    }
  }

  return (
    <div>
      <h1>{info.title}</h1>
      <Image src={`/main/${info.main_image}`} alt="Carreta principal" width={200} height={200}/>
      <div>
        <button onClick={() => select(info)}><BsFillPencilFill/></button>
        <button onClick={() => setConfirm(true)}><BsFillTrashFill/></button>
      </div>

      {confirm ? <button onClick={() => deleteCartPost()}>Confirmar</button>:null}
    
    </div>
  )
}