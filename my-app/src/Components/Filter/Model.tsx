import style from "@/styles/Filter.module.css"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Model({ item, setFilter, filter, filtrar }: any) {
  const [on, setOn] = useState<boolean>(false)

  return (
    <>
      <section className={style.section}>
        <h2>Modelo</h2>
        {on ?
          <motion.section animate={{rotateZ:90}} onClick={() => setOn(!on)}>
            <IoMdArrowRoundBack />
          </motion.section>
          :
          <motion.section initial={{rotateZ:270}} onClick={() => setOn(!on)}>
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
                  {filter.model === o ?
                    <p className={style.p1} onClick={async () => { setFilter({ ...filter, model: "" }); filtrar({ ...filter, model: "" }) }}>{o.name}</p> :
                    <p onClick={async () => { setFilter({ ...filter, model: o }); filtrar({ ...filter, model: o }) }}>{o.name}</p>
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