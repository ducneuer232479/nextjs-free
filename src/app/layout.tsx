import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import AppProvider from '@/app/app-provider'
import { cookies } from 'next/headers'
import SlideSession from '@/components/slide-session'
import accountApiRequest from '@/apiRequests/account'
import { AccountResType } from '@/schemaValidations/account.schema'
import { baseOpenGraph } from '@/app/shared-metadata'

const inter = Inter({ subsets: ['vietnamese'] })

// const myFont = localFont({
//   src: [
//     {
//       path: './Roboto-Thin.ttf',
//       weight: '100'
//     },
//     {
//       path: './Roboto-Regular.ttf',
//       weight: '400'
//     }
//   ],
//   display: 'swap',
//   variable: '--font-roboto'
// })

export const metadata: Metadata = {
  title: {
    template: '%s | Productic',
    default: 'Productic'
  },
  description: 'Được tạo bởi Đức dev',
  openGraph: baseOpenGraph
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  let user: AccountResType['data'] | null = null
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken.value)
    user = data.payload.data
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
