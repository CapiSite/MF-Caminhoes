import { useState } from "react";
import style from '@/styles/user_page/cart_rental.module.css'

export default function CartInput({ type, alter, value, label, disable} : {type: any[], alter: any, value: string | number, label: string, disable: boolean}) {
  const [active, setActive] = useState<boolean>(false)

  function findId(value: string) {
    if(value ==="Selecione uma opção"){
      alter("Selecione uma opção")
    }
    else if(value === "Outros") {
      setActive(true)
      alter("")
    }else{
      let found = -1
      type.forEach((e, index) =>{
        if(e.name == value) {
        found = index
      }})
      alter(type[found].id)
      setActive(false)
    }
  }

  return (
    <>
      <h2>{label}</h2>
      <select disabled={disable} onChange={(e) => findId(e.target.value)}>
        <option>Selecione uma opção</option>
        {type ?
          type.map((e, index) => {
            return <option key={index}>{e.name}</option>
          })
          : null}
        <option>Outros</option>
      </select>
      {active?
        <input className={style.input} disabled={disable} placeholder="Nome" onChange={(e) =>{ alter(e.target.value)}} value={value}/>
      : null}
    </>
  )
}