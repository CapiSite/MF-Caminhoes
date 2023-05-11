import { UserProvider } from '@/APIContext/UserContext'
import { OptionProvider } from '@/APIContext/UserOption'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <OptionProvider>
        <Component {...pageProps} />
      </OptionProvider>
    </UserProvider>
  )
}
