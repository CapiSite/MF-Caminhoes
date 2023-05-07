import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { postCart } from "@/services/cart.services";
import Image from "next/image"
import path from "path";
import { FormEvent, useState} from 'react'

export default function userArea() {
  const [main, setFile] = useState<null | any>()


  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <Header />
      <Footer />
      <form method="POST" action="http://localhost:5000/carts" encType="multipart/form-data">
        <input type="file" name="main"/>
        
        <button type="submit">aqui</button>
      </form>
    </>
  )
}