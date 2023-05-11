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

export default function Header() {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext) as any;
  const [userInfo, setUserinfo] = useState<boolean>(false);
  const [userName, setUserName] = useState<any>();

  const {setOptionData} = useContext(OptionContext) as any

  const handleCallUser = useCallback(async () => {
    try {
      await verifyToken(userData.token);
      setUserinfo(userData);
    } catch (err: any) {
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      handleCallUser();
      setUserinfo(true);
      setUserName(userData);
    } else {
      setUserinfo(false);
    }
  }, []);

  return (
    <>
      <header className={style.header}>
        <div>
          <Image
            onClick={() => router.push("/")}
            className={style.logo}
            src={Logo}
            width={190}
            height={61}
            alt="Logo"
          />
          <button
            onClick={() => router.push("/locacoes")}
            className={style.options}
          >
            Locar
          </button>
          <button
            onClick={() => {
              setOptionData(0);
              router.push("/perfil");
            }}
            className={style.options}
          >
            Loque sua carreta
          </button>
        </div>
        <div>
          {userInfo ? (
            <div
              className={style.userImage}
              onClick={() => {
                setOptionData(2)
                router.push("/perfil");
              }}
            >
              <p>{userName.user.name}</p>
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
                className={style.options}
              >
                Entrar
              </button>
              <button
                onClick={() => router.push("/cadastrar")}
                className={style.register}
              >
                Cadastre-se
              </button>
            </>
          )}
        </div>
      </header>
      <div className={style.button}>
        <Link
          href="https://web.whatsapp.com/send?phone=55349%209100-1000&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20MF%20Caminh%C3%B5es"
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
