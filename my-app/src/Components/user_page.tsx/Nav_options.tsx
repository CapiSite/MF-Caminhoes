import { useContext } from "react"
import style from "@/styles/user_page/navigator.module.css"
import UserContext from "@/APIContext/UserContext"
import Image from "next/image"
import { roboto } from "@/styles/fonts"

export default function NavOptions({ subsets, select }: { subsets: string[], select: Function }) {
  const { userData } = useContext(UserContext) as { userData: any }

  return (
    <div className={`${style.father} ${roboto.className}`}>
      <header>
        <Image src={"/default_photo.png"} height={35} width={40} alt="foto do usuário" />
        <h4>
          {userData !== undefined? userData?.user?.name:
          null}
        </h4>
      </header>
      {subsets.map((e, index) => {
        return <div onClick={() => select(index)}>{e}</div>
      })}
    </div>
  )
}