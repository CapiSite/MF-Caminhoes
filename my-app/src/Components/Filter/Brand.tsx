export default function Brand({item, setFilter, filter}:any){
    return(
        <>
            {filter.brand===item?<h6 onClick={()=> setFilter({...filter, brand:""})}>{item}</h6>:<p onClick={()=> setFilter({...filter, brand:item})}>{item}</p>}
        </>
    )
}