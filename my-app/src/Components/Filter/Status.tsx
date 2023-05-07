export default function Status({item, setFilter, filter}:any){
    return(
        <>
            {filter.status===item?<h6 onClick={()=> setFilter({...filter, status:""})}>{item}</h6>:<p onClick={()=> setFilter({...filter, status:item})}>{item}</p>}
        </>
    )
}