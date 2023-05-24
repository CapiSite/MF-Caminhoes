import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from '@/styles/Carousel_Images.module.css';

export default function CarroselMain() {

  const images = [
    '/Banner 1 light.jpg',
    '/Banner 2 light.jpg',
    '/Banner 3 light.jpg'
  ]

  const imagesMobile = [
    '/Banner 1 mob light.jpg',
    '/Banner 2 mob light.jpg',
    '/Banner 3 mob light.jpg'
  ]

  return (
    <>
      <div className={style.desktop}>
        <Carousel showThumbs={false} autoPlay infiniteLoop={true} interval={3000}>
          {images.map((product, index) => (
            <div>
              <img src={images[index]} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={style.mobile}>
        <Carousel showThumbs={false} autoPlay infiniteLoop={true} interval={3000}>
          {images.map((product, index) => (
            <div>
              <img src={imagesMobile[index]} />
            </div>
          ))}
        </Carousel>
      </div>
    </>

  );
}
