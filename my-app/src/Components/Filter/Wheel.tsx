import style from "@/styles/Filter.module.css"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Wheel({ item, setFilter, filter, filtrar }: any) {
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
          <motion.section animate={{rotateZ:270}} onClick={() => setOn(!on)}>
            <IoMdArrowRoundBack />
          </motion.section>
        }
      </section>


      <AnimatePresence>
        {on &&

          <motion.div animate={{ x: 0 }} initial={{ x: -500 }} exit={{ x: -500 }} transition={{ duration: 1, type: "tween" }} className={style.block}>
            {item ? item.map((o: any) => {
              return (
                <>
                  {filter.wheel === o ?
                    <p className={style.p1} onClick={async () => { setFilter({ ...filter, wheel: "" }); filtrar({ ...filter, wheel: "" }) }}>{o.name}</p> :
                    <p onClick={async () => { setFilter({ ...filter, wheel: o }); filtrar({ ...filter, wheel: o }) }}>{o.name}</p>
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