import { useState } from "react";

export default function CartInput({ type, alter, value, label} : {type: any[], alter: any, value: string | number, label: string}) {
  const [active, setActive] = useState<boolean>(false)

  function findId(value: string) {

    if(value === "Outros") {
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
      <select onChange={(e) => findId(e.target.value)}>
        {type ?
          type.map((e, index) => {
            return <option key={index}>{e.name}</option>
          })
          : null}
        <option>Outros</option>
      </select>
      {active?
        <input placeholder="Nome" onChange={(e) =>{ console.log(e.target.value); alter(e.target.value)}} value={value}/>
      : null}
    </>
  )
}