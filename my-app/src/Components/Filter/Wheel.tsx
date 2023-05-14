import style from "@/styles/Filter.module.css"

export default function Wheel({ item, setFilter, filter,filtrar }: any) {
  return (
    <>
    {filter.wheel === item ?<p className={style.p1} onClick={async () => {setFilter({ ...filter, wheel: "" });filtrar({ ...filter, wheel: "" })}}>{item.name}</p> : <p onClick={async () => {setFilter({ ...filter, wheel: item });filtrar({ ...filter, wheel: item })}}>{item.name}</p>}
  </>
  )
  
}