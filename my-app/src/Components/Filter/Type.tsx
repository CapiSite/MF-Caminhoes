import style from "@/styles/Filter.module.css"


export default function Type({ item, setFilter, filter, filtrar }: any) {
  return (
    <>
      {filter.type === item ?
        <p className={style.p1} onClick={async () => { setFilter({ ...filter, type: "" }); filtrar({ ...filter, type: "" }) }}>{item.name}</p>
        : <p onClick={async () => { setFilter({ ...filter, type: item }); filtrar({ ...filter, type: item }) }}>{item.name}</p>}
    </>
  )
}