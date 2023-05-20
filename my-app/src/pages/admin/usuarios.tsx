import AdminContext from "@/APIContext/AdminContext";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import style from "@/styles/users.module.css";
import Footer from "@/Components/Footer";

export default function Adm() {
  const router = useRouter()

  const users = [{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"},{name: "Hugo", email:"abcdef@abcdef.com", phone:"61938172232"}]

  const {adminData} = useContext(AdminContext) as any
  
  const handleCall = useCallback(async () => {
    try {

    } catch (err: any) { }
  }, [])

  useEffect(() =>{
    if(adminData){
      handleCall()
    }
    else{
      router.push("/")
    }
  }, [])

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
        {users.map((a)=><div><span>{a.name}</span><span>{a.email}</span><span>{a.phone}</span></div>)}
      </div>
      <Footer />
    </>
  )

}