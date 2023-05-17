import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pepiti Stats',
  description: 'MX Bikes Stats',
  keywords: 'Pepiti, MX Bikes Stats, MX Bikes, Stats, MXBikes, MXBikes Stats, MXB Mods',
}

import useAuthUser from '~/utils/useAuthUser'
import NavBar from '~/components/Navbar'
import Footer from '~/components/Footer'

import '~/globals.css'
import { usePathname } from 'next/navigation'
import DonationBanner from './dashboard/components/DonationBanner'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await useAuthUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar user={user} />
        <div className="max-w-[1400px] px-2 md:px-0 mx-auto flex-1 w-full">{children}</div>
        <Footer user={user} />
      </body>
    </html>
  )
}
