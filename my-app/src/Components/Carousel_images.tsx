import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from '@/styles/Carousel_Images.module.css';

export default function CarroselMain() {

  const images = [
    '/Banner 1.jpg',
    '/Banner 2.jpg',
    '/Banner 3.jpg'
  ]

  const imagesMobile = [
    '/Banner1 mob.jpg',
    '/Banner 2 mob.jpg',
    '/Banner 3 mob.jpg'
  ]

  return (
    <>
      <div className={style.desktop}>
        <Carousel showThumbs={false} autoPlay infiniteLoop={true} interval={3000}>
          {images.map((product, index) => (
            <div key={index}>
              <img src={images[index]} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={style.mobile}>
        <Carousel showThumbs={false} autoPlay infiniteLoop={true} interval={3000}>
          {images.map((product, index) => (
            <div key={index}>
              <img src={imagesMobile[index]} />
            </div>
          ))}
        </Carousel>
      </div>
    </>

  );
}
