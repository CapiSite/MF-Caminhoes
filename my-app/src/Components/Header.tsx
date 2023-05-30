import Image from "next/image";
import style from "../styles/HeaderStyle.module.css";
import { useRouter } from "next/router";
import Logo from "../../public/LogoLocacao.png";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "@/APIContext/UserContext";
import { verifyToken } from "@/services/user-services";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import OptionContext from "@/APIContext/UserOption";
import AdminContext from "@/APIContext/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


export default function Header() {
  const router = useRouter();

  const [userInfo, setUserinfo] = useState<boolean>(false);
  const [userName, setUserName] = useState<any>();
  const [adminOn, setAdminOn] = useState<any>(false)

  const { userData, setUserData } = useContext(UserContext) as any;
  const { adminData } = useContext(AdminContext) as any
  const { setOptionData } = useContext(OptionContext) as any

  const handleCallUser = useCallback(async () => {
    console.log(adminData)
    try {
      if(userData.token){
        const user = await verifyToken(userData.token);
        if(user){
          setUserName(userData.user.name);
          setUserinfo(true)
        }
      }
      if(adminData) {
        setAdminOn(true)
      }

    } catch (err: any) {
      toast.warn(err?.response?.data?.message)
      setUserData(null);
    }
  }, [userData]);

  useEffect(() => {
    handleCallUser();
  }, [userData]);

  return (
    <>
      <header className={style.header}>
        <div>
          <Image
            onClick={() => router.push("/")}
            className={style.logo}
            src={Logo}
            width={190}
            height={80}
            alt="Logo"
          />
          <button
            onClick={() => router.push("/locacoes")}
            className={style.options}
          >
            Alugar
          </button>
          {userInfo || adminOn ?<button
                onClick={() => router.push("/login")}
                className={style.options}
              >
                Anuncie Aqui
              </button>:<></>}
          
        </div>
        <div>
          {userInfo || adminOn? (
            <div
              className={style.userImage}
              onClick={() => {
                setOptionData(2)
                router.push("/perfil");
              }}
            >
              <p>{adminOn ? null : userName}</p>
              <Image
                src="/default_photo.png"
                width={35}
                height={30}
                alt="foto de usuário"
              />
            </div>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className={style.register}
              >
                Anuncie Aqui
              </button>
            </>
          )}
        </div>
      </header>
      <div className={style.button}>
        <Link
          href="https://api.whatsapp.com/send?phone=5534992771000&text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atr%C3%A1ves%20do%20site%20LocaAqui!
"
          target="_blank"
        >
          <button>
            <BsWhatsapp />
            <p>Fale conosco</p>
          </button>
        </Link>
      </div>
    </>
  );
}
