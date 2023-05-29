import style from "@/styles/Filter.module.css"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function Brand({ item, setFilter, filter, filtrar }: any) {
  const [on, setOn] = useState<boolean>(false)

  return (
    <>
      <section className={style.section}>
        <h2>Marca</h2>
        {on ?
          <motion.section animate={{rotateZ: 90}} onClick={() => setOn(!on)}>
            <IoMdArrowRoundBack />
          </motion.section>
          :
          <motion.section initial={{rotateZ: 270}}  onClick={() => setOn(!on)}>
            <IoMdArrowRoundBack />
          </motion.section>
        }
      </section>


      <AnimatePresence>
        {on &&

          <motion.div animate={{x: 0}} initial={{x:-500}} exit={{x:-500}} transition={{duration:1, type:"tween"}} className={style.block}>
            {item ? item.map((o: any) => {
              return (
                <>
                  {filter.brand === o ?
                    <p className={style.p1} onClick={async () => { setFilter({ ...filter, brand: "" }); filtrar({ ...filter, brand: "" }) }}>{o.name}</p> :
                    <p onClick={async () => { setFilter({ ...filter, brand: o }); filtrar({ ...filter, brand: o }) }}>{o.name}</p>
                  }
                </>
              )
            }) : null}
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}