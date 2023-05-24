import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  keywords:
    'Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods',
}

import { Analytics } from '@vercel/analytics/react'
import getAuthUser from '~/api/getAuthUser'
import NavBar from '~/components/Navbar'
import Footer from '~/components/Footer'

import '~/globals.css'

interface Props {
  children: React.ReactNode
}

export default async function RootLayout(props: Props) {
  const user = getAuthUser()

  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <NavBar user={user} />
        {props.children}
        <Footer user={user} />
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
