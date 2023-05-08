import { raleway } from '@/styles/fonts'
import style from '@/styles/user_page/alert_message.module.css'
import Link from 'next/link'


export default function AlertMessage() {


  return (
    <div className={`${style.father} ${raleway.className}`}>
      <h1>Ops, parece que você não está logado</h1>
      <button>  
        <Link href={'/login'}>Logue agora </Link>
      </button>
      
    </div>
  )
}