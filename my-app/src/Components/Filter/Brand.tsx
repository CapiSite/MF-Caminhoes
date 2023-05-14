import style from "@/styles/Filter.module.css"


export default function Brand({ item, setFilter, filter, filtrar }: any) {
  return (
    <>
    {filter.brand ===item ? <p className={style.p1} onClick={async () => {setFilter({ ...filter, brand: "" });filtrar({ ...filter, brand: "" })}}>{item.name}</p>:<p className={style.p2} onClick={async () => {setFilter({ ...filter, brand: item });filtrar({ ...filter, brand: item })}}>{item.name}</p>}
     
  </>
  )
}