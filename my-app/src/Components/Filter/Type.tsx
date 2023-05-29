import style from "@/styles/Filter.module.css"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function Type({ item, setFilter, filter, filtrar }: any) {
  const [on, setOn] = useState<boolean>(false)

  return (
    <>
      <section className={style.section}>
        <h2>Tipo</h2>
        {on ?
          <motion.section onClick={() => setOn(!on)}>
            <IoMdArrowRoundBack />
          </motion.section>
          :
          <motion.section animate={{rotateZ:180}} onClick={() => setOn(!on)}>
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
                  {filter.type === o ?
                    <p className={style.p1} onClick={async () => { setFilter({ ...filter, type: "" }); filtrar({ ...filter, type: "" }) }}>{o.name}</p> :
                    <p onClick={async () => { setFilter({ ...filter, type: o }); filtrar({ ...filter, type: o }) }}>{o.name}</p>
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