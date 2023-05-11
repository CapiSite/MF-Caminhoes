import { useContext, useEffect, useState } from "react"
import style from "@/styles/user_page/navigator.module.css"
import UserContext from "@/APIContext/UserContext"
import Image from "next/image"
import { roboto } from "@/styles/fonts"
import OptionContext from "@/APIContext/UserOption"

export default function NavOptions({ subsets }: { subsets: string[] }) {
  const [ userInfo, setUserInfo] = useState<any>()

  const { userData } = useContext(UserContext) as { userData: any }
  const { setOptionData }= useContext(OptionContext) as any

  useEffect(() =>{
    if(userData) {
      setUserInfo(userData)
    }

  }, [])

  return (
    <div className={`${style.father} ${roboto.className}`}>
      <header>
        <Image src={"/default_photo.png"} height={35} width={40} alt="foto do usuário" />
        <h4>
          {userInfo ? userInfo.user.name : null}
        </h4>
      </header>
      {subsets.map((e, index) => {
        return <div onClick={() => setOptionData(index)} key={index}>{e}</div>
      })}
    </div>
  )
}