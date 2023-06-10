import CarrouselItem from "@/Components/Carousel";
import CarrouselItemLarge from "@/Components/Carousel_large"
import { motion } from "framer-motion"
import style from "@/styles/Carousel_line.module.css"
import {  useRef } from "react";

export default function CarroselLine({ items, index, type }: { items: any[], index: number, type: number }) {
  const component = useRef() as any;

  return (
    <div className={index === 1 ? style.other : style.father}>
      <motion.div ref={component} className={index === 1 ? style.other : style.father} transition={{ duration: 1 }}>
        {items.map((product, index) => {
          if (type === 1){
            return <CarrouselItem info={product} key={index} />
          }
          if( type === 2) {
            return <CarrouselItemLarge info={product} key={index} />
          }
            
        })}
      </motion.div>

      <div className={style.next} onClick={() => {
        if( type === 1) {
          component.current.scrollLeft += 220
        }
        
        if( type === 2) {
          component.current.scrollLeft += 420
        }
        
        }}>
        {"‣"}
      </div>
      <div className={style.prev} onClick={() => {
        if( type === 1) {
          component.current.scrollLeft -= 220
        }
        
        if( type === 2) {
          component.current.scrollLeft -= 420
        }
        }}>
        {"‣"}
      </div>
    </div>

  );
}
