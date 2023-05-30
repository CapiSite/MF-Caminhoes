import { AdminProvider } from '@/APIContext/AdminContext'
import { UserProvider } from '@/APIContext/UserContext'
import { OptionProvider } from '@/APIContext/UserOption'
import { AddedProvider } from '@/APIContext/addedContext'
import { exo2 } from '@/styles/fonts'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <OptionProvider>
        <AdminProvider>
          <AddedProvider>
            <Component {...pageProps} />
          </AddedProvider>
        </AdminProvider>
      </OptionProvider>
    </UserProvider>
  )
}
