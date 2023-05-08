import { verifyToken } from "@/services/user-services"
import { useRouter } from "next/router"
import { useCallback } from "react"


const handleCallUser = (userData :any, setUserData: any) => useCallback(async () => {
  const router = useRouter()

  try {
    await verifyToken(userData.token)
    router.push("/")
  } catch (err: any) {
    if(err.response.status === 401){
      setUserData(null)
    }
  }
}, [])

export default handleCallUser