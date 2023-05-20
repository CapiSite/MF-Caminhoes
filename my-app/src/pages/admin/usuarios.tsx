import AdminContext from "@/APIContext/AdminContext";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import style from "@/styles/users.module.css";
import Footer from "@/Components/Footer";
import { toast } from "react-toastify";
import { deleteInfo, getAllInfo } from "@/services/info.service";
import { AiOutlineClose } from "react-icons/ai";


export default function Adm() {
  const router = useRouter()
  const [users, setUsers] = useState<{ id: number, name: string, email: string, phone: string }[]>([])

  const { adminData } = useContext(AdminContext) as any

  const handleCall = useCallback(async () => {
    try {
      const usersReceived = await getAllInfo(adminData)
      setUsers(usersReceived)
    } catch (err: any) {
      toast.warn("Ocorreu um erro, tente mais tarde!")
    }
  }, [])

  useEffect(() => {
    if (adminData) {
      handleCall()
    }
    else {
      router.push("/")
    }
  }, [])

  async function deleteInfoPost(id: number) {
    try {
      await deleteInfo(id, adminData)
      setUsers(users.filter((e) => e.id !== id))
    } catch (err: any) {
      toast.warn("Ocorreu um erro, tente mais tarde!")
    }
  }

  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.background}>
        <h1>Lista de usuarios do pop-up</h1>
        {users.map((a) =>
          <div>
            <span>{a.name}</span>
            <span>{a.email}</span>
            <span>{a.phone}</span>
            <AiOutlineClose onClick={() => deleteInfoPost(a.id)} />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}