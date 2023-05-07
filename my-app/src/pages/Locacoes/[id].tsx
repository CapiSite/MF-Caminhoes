import style from "@/styles/LoginStyle.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"


export default function ProductLocation() {
    const route = useRouter()
    const {id} = route.query
  return (
   <>
   <Image src={"/caminhao.jpeg"} alt="Caminhão" width={600} height={600}/>
          <p className={style.p}>
            {id}
          </p>
          <div className={style.p}></div>
  </>
       
  )
}