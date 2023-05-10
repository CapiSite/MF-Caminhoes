import { useState } from "react";

export default function CartInput({ type, alter, value, label} : {type: any[], alter: any, value: string | number, label: string}) {
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <h2>{label}</h2>
      <select>
        {type ?
          type.map((e) => {
            return <option onClick={() =>{ alter(e.id); setActive(false)}}>{e.name}</option>
          })
          : null}
        <option onClick={() =>{ setActive(true); alter("")}}>Outros</option>
      </select>
      {active?
        <input placeholder="Nome" onChange={(e) => alter(e.target.value)} value={value}/>
      : null}
    </>
  )
}