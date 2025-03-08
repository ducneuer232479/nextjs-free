import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

import { Toaster } from '@/components/ui/toaster'
import AppProvider from '@/app/app-provider'
import SlideSession from '@/components/slide-session'
import { baseOpenGraph } from '@/app/shared-metadata'
import Header from '@/components/header'
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/header'), { ssr: false })

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
          <AppProvider>
            <Header />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
