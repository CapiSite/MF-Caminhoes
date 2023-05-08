import Image from "next/image";

export default function Photos({ image, setMainImage }: any) {
  return (
    <>
      <Image onClick={() => setMainImage(image)} src={image} alt="Caminhao" width={198} height={198} />
    </>
  )
}