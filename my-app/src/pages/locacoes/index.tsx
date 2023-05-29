import Cards from "@/Components/Cards";
import Brand from "@/Components/Filter/Brand";
import Model from "@/Components/Filter/Model";
import Type from "@/Components/Filter/Type";
import Wheel from "@/Components/Filter/Wheel";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { getAllCarts } from "@/services/cart.services";
import { getBrands, getModels, getTypes, getWheels } from "@/services/types.services";
import style from "@/styles/LocationsStyle.module.css";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react"
import CurrencyInput from "react-currency-input-field";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineFilter } from "react-icons/ai";


export default function Location() {
  const [filter, setFilter] = useState({ type: "", model: "", brand: "", wheel: "", price: { min: 0, max: 150000000 } })
  const [ct, setCt] = useState(8)
  const [topFilter, setTopFilter] = useState("Destaques")
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: 0 })
  const [mobileFilter, setMobileFilter] = useState(false)
  const [allcarts, setAllcarts] = useState<string[]>([])
  const [carts, setCaminhoes] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [wheels, setWheels] = useState<string[]>([])
  const [filterOn, setFilterOn] = useState<boolean>(false)


  const handleCall = useCallback(async () => {
    try {
      const cartsReceived = await getAllCarts()
      setAllcarts(cartsReceived.sort((a: any, b: any) => {
        return Number(b.id) - Number(a.id)
      }))
      setCaminhoes(cartsReceived.sort((a: any, b: any) => {
        return Number(b.id) - Number(a.id)
      }))

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
          <motion.button animate={{ y: 0 }} initial={{ y: -200 }} transition={{ duration: 0.8 }}
            onClick={() => setMobileFilter(!mobileFilter)}>
            <Image src="/filter.png" alt="Filtrar" width={20} height={20} onClick={() => setMobileFilter(!mobileFilter)} />
            <h3>
              Filtrar
            </h3>
          </motion.button>

          <AnimatePresence>
            {mobileFilter &&

              <motion.div animate={{ y: 0, marginBottom: 0 }} exit={{ y: -600, marginBottom: -300 }} initial={{ y: -600, marginBottom: -300 }} transition={{ duration: 1 }} className={style.filterMobile}>
                <h1>Preço</h1>
                <div className={style.rangeMobile}>
                  <CurrencyInput intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} value={Number(filterPrice.min)}
                    onChange={(e) => setFilterPrice({ ...filterPrice, min: Number(e.target.value.replace(/[^\d]/g, "")) })} placeholder="R$ 10000,00" />
                  <CurrencyInput intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} value={Number(filterPrice.max)}
                    onChange={(e) => setFilterPrice({ ...filterPrice, max: Number(e.target.value.replace(/[^\d]/g, "")) })} placeholder="R$ 1000000,00" />

                  <button onClick={() => filterP()}>Filtrar</button>
                </div>
                {types ? <Type setFilter={setFilter} filtrar={filtrar} filter={filter} item={types} key={1} /> : null}
                {models ? <Model setFilter={setFilter} filtrar={filtrar} filter={filter} item={models} key={2} /> : null}
                {brands ? <Brand setFilter={setFilter} filtrar={filtrar} filter={filter} item={brands} key={3} /> : null}
                {wheels ? <Wheel setFilter={setFilter} filtrar={filtrar} filter={filter} item={wheels} key={4} /> : null}
              </motion.div>
            }
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {
            filterOn &&
            <motion.div className={style.filter} animate={{ x: 0, marginRight: 0 }} initial={{ x: -300, marginRight: -300 }} exit={{ x: -300, marginRight: -300 }} transition={{ duration: 1 }}>
              <div>
                <h1>Filtros</h1>
                <section onClick={() => setFilterOn(false)}>
                  <IoMdArrowRoundBack />
                </section>
              </div>
              <h1>Preço</h1>
              <div className={style.range}>
                <CurrencyInput intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} value={Number(filterPrice.min)}
                  onChange={(e) => setFilterPrice({ ...filterPrice, min: Number(e.target.value.replace(/[^\d]/g, "")) })} placeholder="R$ 10000,00" />
                <CurrencyInput intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} value={Number(filterPrice.max)}
                  onChange={(e) => setFilterPrice({ ...filterPrice, max: Number(e.target.value.replace(/[^\d]/g, "")) })} placeholder="R$ 1000000,00" />

                <button onClick={() => filterP()}>Filtrar</button>
              </div>

              {types ? <Type setFilter={setFilter} filtrar={filtrar} filter={filter} item={types} key={1} /> : null}
              {models ? <Model setFilter={setFilter} filtrar={filtrar} filter={filter} item={models} key={2} /> : null}
              {brands ? <Brand setFilter={setFilter} filtrar={filtrar} filter={filter} item={brands} key={3} /> : null}
              {wheels ? <Wheel setFilter={setFilter} filtrar={filtrar} filter={filter} item={wheels} key={4} /> : null}
            </motion.div>
          }
        </AnimatePresence>

        <AnimatePresence>
          {
            !filterOn &&
            <motion.section animate={{ y: 0 }} initial={{ y: -200 }} exit={{ y: -200 }} transition={{ duration: 1 }} className={style.goBack} onClick={() => setFilterOn(true)}>
              <AiOutlineFilter />
            </motion.section>
          }
        </AnimatePresence>


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
            {carts.length === 0 ? <div className={style.locationsContainer}><p className={style.noCars}>Não há carretas</p></div> :
              <div className={style.locationsContainer}>
                {carts.filter((o: any) => o.price <= Number(filter.price.max * 100) && o.price >= Number(filter.price.min * 100)).map((o: any, i) => <Cards key={i} index={i} ct={ct} setCt={setCt} image={o.main_image} id={o.id} sections={o.sections} title={o.title} price={o.price} />)}
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


  function TopFilter(e: any) {
    setTopFilter(e)
    setCaminhoes(carts.sort((a: any, b: any) => {
      if (e === "Preço menor - maior") {
        return Number(a.price) - Number(b.price)
      }
      if (e === "Preço maior - menor") {
        return Number(b.price) - Number(a.price)
      }
      if (e === "Nome A-Z") {
        return a.title.localeCompare(b.title)
      }
      if (e === "Nome Z-A") {
        return b.title.localeCompare(a.title)
      }
      if (e === "Destaques") {
        return Number(b.id) - Number(a.id)
      }
    }))

  }

  function filterP() {
    setFilter({ ...filter, price: { min: Number(filterPrice.min), max: Number(filterPrice.max) } })
  }

  function filtrar(item: any) {
    let filtro: any = allcarts;
    if (item.brand.name) {
      filtro = filtro.filter((o: any) => o.brands.name === item.brand.name)
    }
    if (item.model.name) {
      filtro = filtro.filter((o: any) => o.cart_model.name === item.model.name)
    }
    if (item.type.name) {
      filtro = filtro.filter((o: any) => o.cart_type.name === item.type.name)
    }
    if (item.wheel.name) {
      filtro = filtro.filter((o: any) => o.wheel.name === item.wheel.name)
    }
    TopFilter(topFilter)

    setCaminhoes(filtro)

  }
}