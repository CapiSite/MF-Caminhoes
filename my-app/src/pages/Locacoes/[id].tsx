import style from "@/styles/LoginStyle.module.css"
import { useRouter } from "next/router"
import { useState } from "react"


export default function Opa() {
    const route = useRouter()
    const {id} = route.query
    const [hugo, setHugo] = useState <string> ("Oi")
  return (
   <>
          <p className={style.p}>
            {id}
          </p>
          <div className={style.p}></div>
          </>
       
  )
}