import CarrouselItem from "@/Components/Carousel";
import { motion,  useMotionValue } from "framer-motion"
import { animate } from "framer-motion"
import style from "@/styles/Carousel_line.module.css"
import { useEffect, useRef, useState } from "react";

export default function CarroselLine({ items }: { items: any[] }) {
  const component = useRef() as any;
  const x = useMotionValue(0)
  const [width, setWidth] = useState(0)

  useEffect(() =>{
    setWidth(component.current?.scrollWidth - component.current?.scrollWidth)
  })

  return (
    <div ref={component} className={style.father}>
      <motion.div dragConstraints={{right: 0, left: -width}} className={style.father} style={{x}} transition={{ duration: 0.6}}>
        {items.map((product, index) => (
          <CarrouselItem info={product} key={index} />
        ))}
      </motion.div>

      <div className={style.next} onClick={() => { if(x.get() - 218 > width) animate(x,x.get() -  218, { duration: 0.5 }) }}>
        {"‣"}
      </div>
      <div className={style.prev} onClick={() => { if(x.get() +  218 <= 0) {animate(x, x.get() + 218, { duration: 0.5 })}}}>
        {"‣"}
      </div>
    </div>

  );
}
