import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { trpc } from '../utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { Inter } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '800', '900']
})

const MyApp = ({
  Component,
  pageProps
}: AppProps<{
  session: Session
}>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        <Component {...pageProps} />
        <Analytics />
        <div id="headlessui-portal-root">
          <div />
        </div>
      </div>
    </SessionProvider>
  )
}
export default trpc.withTRPC(MyApp)
