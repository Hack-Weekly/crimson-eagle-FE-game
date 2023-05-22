import { ClerkProvider } from '@clerk/nextjs/app-beta'

import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/footer'
import Header from './components/header'

const inter = Inter({
  subsets: ['latin']
})



export const metadata = {
  title: 'Chess',
  description: 'Created by Crimson Eagle'
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${inter.className} h-full scroll-smooth antialiased container`}
    >
      <body className='flex h-full flex-col text-stone-100'>
        <ClerkProvider>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout