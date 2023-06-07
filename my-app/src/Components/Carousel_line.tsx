import CarrouselItem from "@/Components/Carousel";
import { motion, useMotionValue } from "framer-motion"
import style from "@/styles/Carousel_line.module.css"
import { useEffect, useRef, useState } from "react";

export default function CarroselLine({ items, index }: { items: any[], index:number }) {
  const component = useRef() as any;
  const x = useMotionValue(0)
  const [width, setWidth] = useState(0)

  useEffect(() =>{
    setWidth(component.current?.scrollWidth - component.current?.scrollWidth)
    
  })

  return (
    <div className={index===1?style.other:style.father}>
      <motion.div ref={component} className={index===1?style.other:style.father}  transition={{ duration: 1}}>
        {items.map((product, index) => (
          <CarrouselItem info={product} key={index} />
        ))}
      </motion.div>

      <div className={style.next} onClick={() => component.current.scrollLeft += 220}>
        {"‣"}
      </div>
      <div className={style.prev} onClick={ () => component.current.scrollLeft -= 220}>
        {"‣"}
      </div>
    </div>

  );
}
