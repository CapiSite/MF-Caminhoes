import style from "@/styles/Filter.module.css"

export default function Model({ item, setFilter, filter, filtrar }: any) {
    
    return (
    
      <> 
        {filter.model ===item ? 
        <p className={style.p1} onClick={ () => {setFilter({ ...filter, model: "" });filtrar({ ...filter, model: "" })}}>{item.name}</p>:
        <p className={style.p2} onClick={ () => {setFilter({ ...filter, model: item });filtrar({ ...filter, model: item })}}>{item.name}</p>}
         

      </>
    )
    
  }