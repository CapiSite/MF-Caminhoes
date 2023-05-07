import Cards from "@/Components/Cards";
import Brand from "@/Components/Filter/Brand";
import Status from "@/Components/Filter/Status";
import Type from "@/Components/Filter/Type";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import style from "@/styles/LocationsStyle.module.css";
import Image from "next/image";
import { useState } from "react"


const caminhao = ["Caminhao 1", "Caminhao 2", "Caminhao 3", "Caminhao 4", "Caminhao 5", "Caminhao 6","Caminhao 1", "Caminhao 2", "Caminhao 3", "Caminhao 4", "Caminhao 5", "Caminhao 6","Caminhao 1", "Caminhao 2", "Caminhao 3", "Caminhao 4", "Caminhao 3", "Caminhao 4", "Caminhao 3", "Caminhao 4"]


const tipo = ["Caminhao", "Carreta", "Cabeça"]
const estado = ["Novo" , "Seminovo"]
const marca = ["Bitrem", "Bitrem 9 eixos", "Rodotrem", "Semi-Reboque", "Volkswagen", "Iveco", "Mercedes-Benz", "Scania", "Volvo"]

const Ordenar = "Ordenar"

export default function Location() {
  const [filter, setFilter] = useState({type:"", status:"", brand:""})
  const [ct, setCt] = useState(8)
  const [mobileFilter, setMobileFilter] = useState(false)

  return (
   <>
          <div className={style.header}>
            <Header/>
          </div>
          <div className={style.sidebar}>
            <Sidebar/>
          </div>
          <div className={style.container}>

          <div className={style.mobileFilter}>
            <button onClick={()=> setMobileFilter(!mobileFilter)}><Image src="/filter.png" alt="Filtrar" width={20} height={20}onClick={()=> setMobileFilter(!mobileFilter)}/>Filtrar</button>
            {mobileFilter && 
            <div className={style.filterMobile}>
            <h1>Preço</h1>
            <div className={style.rangeMobile}>
              <p>Min:</p>
              <input type="number" min="10000" placeholder="R$ 10000,00"/>
              <p>Max:</p>
              <input type="number" placeholder="R$ 1000000,00"/>
              <button>Filtrar</button>
            </div>
            <h1>Tipo</h1>
            {tipo.map((o, i)=><Type setFilter={setFilter} filter={filter} item={o} key={i}/>)}
            <h1>Estado</h1>
            {estado.map((o, i)=><Status setFilter={setFilter} filter={filter} item={o} key={i}/>)}
            <h1>Marca</h1>
            {marca.map((o, i)=><Brand setFilter={setFilter} filter={filter} item={o} key={i}/>)}
          </div>
          }
          </div>

          <div className={style.filter}>
            <h1>Filtros</h1>
            <h1>Preço</h1>
            <div className={style.range}>
              <input type="number" min="10000" placeholder="R$ 10000,00"/>
              <input type="number" placeholder="R$ 1000000,00"/>
              <button>Filtrar</button>
            </div>
            <h1>Tipo</h1>
            {tipo.map((o, i)=><Type setFilter={setFilter} filter={filter} item={o} key={i}/>)}
            <h1>Estado</h1>
            {estado.map((o, i)=><Status setFilter={setFilter} filter={filter} item={o} key={i}/>)}
            <h1>Marca</h1>
            {marca.map((o, i)=><Brand setFilter={setFilter} filter={filter} item={o} key={i}/>)}
          </div>


          <div className={style.body}>
          <div className={style.locations}>
            <div className={style.div}>
              <h1>Destaques</h1>
              <select name="Ordenar">
                <option value="">Destaques</option>
                <option value="A-Z">Nome A-Z</option>
                <option value="Z-A">Nome Z-A</option>
                <option value="Z-A">Preço menor - maior</option>
                <option value="Z-A">Preço maior - menor</option>
              </select>
            </div>
            <div className={style.locationsContainer}>
              {caminhao.map((o, i)=><Cards item={o} key={i} index={i} ct={ct} setCt={setCt}/>)}
            </div>
            {ct<=caminhao.length?<div className={style.more}>
              <button onClick={()=> setCt(ct+8)}>Ver mais</button>
            </div>:<></>}
            
            
          </div>
          </div>
          </div>
          <Footer />
          </>
       
  )
}