import Cards from "@/Components/Cards";
import Brand from "@/Components/Filter/Brand";
import Model from "@/Components/Filter/Model";
import Type from "@/Components/Filter/Type";
import Wheel from "@/Components/Filter/Wheel";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { getAllCarts, getUnvalidCarts } from "@/services/cart.services";
import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services";
import style from "@/styles/LocationsStyle.module.css";
import { AxiosError } from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react"


export default function Location() {
  const [filter, setFilter] = useState({ type: "", model: "", brand: "", wheel:"", price:{min:"0", max:"150000000"} })
  const [ct, setCt] = useState(8)
  const [topFilter, setTopFilter] = useState("Destaques")
  const [filterPrice, setFilterPrice] = useState({min:"RS 0,00", max:"R$ 150000000,00"})
  const [mobileFilter, setMobileFilter] = useState(false)
  const [allcarts, setAllcarts] = useState<string[]>([])
  const [carts, setCaminhoes] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [wheels, setWheels] = useState<string[]>([])


  const handleCall = useCallback(async () => {
    try {
      const cartsReceived = await getAllCarts()
      setAllcarts(cartsReceived)
      setCaminhoes(cartsReceived)
      console.log(cartsReceived)
      const brandsReceived = await getBrands()
      setBrands(brandsReceived)

      const typesReceived = await getTypes()
      setTypes(typesReceived)

      const modelsReceived = await getModels()
      setModels(modelsReceived)

      const wheelsReceived = await getWheels()
      setWheels(wheelsReceived)

    } catch (err) {
      const error = err as AxiosError

    }

  }, [])


  useEffect(() => {
    handleCall()
  }, [])

  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.container}>

        <div className={style.mobileFilter}>
          <button onClick={() => setMobileFilter(!mobileFilter)}><Image src="/filter.png" alt="Filtrar" width={20} height={20} onClick={() => setMobileFilter(!mobileFilter)} />Filtrar</button>
          {mobileFilter &&
            <div className={style.filterMobile}>
              <h1>Preço</h1>
              <div className={style.rangeMobile}>
                <p>Min:</p>
                <input type="number" value={filterPrice.min} onChange={(e) => setFilterPrice({ ...filterPrice, min: e.target.value })} min="10000" placeholder="R$ 10000,00" />
                <p>Max:</p>
                <input type="number" value={filterPrice.max} onChange={(e) => setFilterPrice({ ...filterPrice, max: e.target.value })} placeholder="R$ 1000000,00" />
                <button onClick={()=>filterP()}>Filtrar</button>
              </div>
              <h1>Tipo</h1>
              {types ? types.map((o, i) => { return <Type setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
              <h1>Modelo</h1>
              {models ? models.map((o, i) => { return <Model setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
              <h1>Marca</h1>
              {brands ? brands.map((o, i) => { return <Brand setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
              <h1>Roda</h1>
              {wheels ? wheels.map((o, i) => { return <Wheel setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
            </div>
          }
        </div>

        <div className={style.filter}>
          <h1>Filtros</h1>
          <h1>Preço</h1>
          <div className={style.range}>
            <input type="number" value={filterPrice.min} onChange={(e) => setFilterPrice({ ...filterPrice, min: e.target.value })} min="10000" placeholder="R$ 10000,00" />
            <input type="number" value={filterPrice.max} onChange={(e) => setFilterPrice({ ...filterPrice, max: e.target.value })} placeholder="R$ 1000000,00" />
            <button onClick={()=>filterP()}>Filtrar</button>
          </div>
          <h1>Tipo</h1>
          {types ? types.map((o, i) => { return <Type setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
          <h1>Modelo</h1>
          {models ? models.map((o, i) => { return <Model setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
          <h1>Marca</h1>
          {brands ? brands.map((o, i) => { return <Brand setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
          <h1>Roda</h1>
          {wheels ? wheels.map((o, i) => { return <Wheel setFilter={setFilter} filtrar={filtrar} filter={filter} item={o} key={i} /> }) : null}
        </div>


        <div className={style.body}>
          <div className={style.locations}>
            <div className={style.div}>
              <h1>Destaques</h1>
              <select onChange={(e) => TopFilter(e.target.value)} name="Ordenar">
                <option value="Destaques">Destaques</option>
                <option value="Nome A-Z">Nome A-Z</option>
                <option value="Nome Z-A">Nome Z-A</option>
                <option value="Preço menor - maior">Preço menor - maior</option>
                <option value="Preço maior - menor">Preço maior - menor</option>
              </select>
            </div>
            {carts.length===0?<div className={style.locationsContainer}><p className={style.noCars}>Não há carretas</p></div>:
            <div className={style.locationsContainer}>
            {carts.filter((o:any)=> o.price<=Number(filter.price.max) && o.price>=Number(filter.price.min)).map((o: any, i) => <Cards key={i} index={i} ct={ct} setCt={setCt} image={o.main_image} id={o.id} sections={o.sections} title={o.title} price={o.price} />)}
          </div>}
            
            {ct <= carts.length ? <div className={style.more}>
              <button onClick={() => setCt(ct + 8)}>Ver mais</button>
            </div> : <></>}


          </div>
        </div>
      </div>
      <Footer />
    </>

  )


function TopFilter(e:any){
setTopFilter(e)
setCaminhoes(carts.sort((a:any, b:any)=>{
  if(e === "Preço menor - maior"){
    return Number(a.price) - Number(b.price)
  }
  if(e === "Preço maior - menor"){
    return Number(b.price) - Number(a.price)
  }
  if(e=== "Nome A-Z"){
    return a.title.localeCompare(b.title)
  }
  if(e=== "Nome Z-A"){
    return b.title.localeCompare(a.title)
  }
  if(e==="Destaques"){
    return Number(a.id) - Number(b.id)
  }
}))

}

function filterP(){
  const priceMin = filterPrice.min.replace("R$ ", "")
  const priceMax = filterPrice.max.replace("R$ ", "")

  setFilter({...filter, price:{min:priceMin,max:priceMax}})
}
function filtrar(item:any){
  let filtro:any = allcarts;
    if (item.brand.name){
      filtro = filtro.filter((o:any) => o.brands.name === item.brand.name)
    }
    if (item.model.name){
      filtro = filtro.filter((o:any) => o.cart_model.name === item.model.name)
    }
    if (item.type.name){
      filtro = filtro.filter((o:any) => o.cart_type.name === item.type.name)
    }
    if (item.wheel.name){
     filtro = filtro.filter((o:any) => o.wheel.name === item.wheel.name)
    }
    TopFilter(topFilter)
    
    setCaminhoes(filtro)
    
}
}