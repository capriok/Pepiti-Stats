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

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await useAuthUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar user={user} />

        <DonationBanner />

        <div className="max-w-[1400px] px-2 md:px-0 mx-auto flex-1 w-full">{children}</div>
        <Footer user={user} />
      </body>
    </html>
  )
}

const DonationBanner = () => {
  return (
    <div className="bg-green-500/50 py-1 text-center text-white">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://paypal.me/pepitisdevs?country.x=US&locale.x=en_US`}
        className="hover:text-green-200 cursor-pointer">
        Help us out with a donation!
      </a>
    </div>
  )
}
