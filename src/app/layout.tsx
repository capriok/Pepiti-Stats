import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  keywords:
    "Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods",
}

import { Providers } from "./providers"
import { Toaster } from "~/ui/Toaster"
import GetAuthUser, { GetAdminNotifications } from "~/api"
import NavBar from "~/components/Navbar"
import Footer from "~/components/Footer"

import "~/globals.css"
import DonationBanner from "./dashboard/components/DonationBanner"

interface Props {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function RootLayout(props: Props) {
  const user = await GetAuthUser()
  const notifications = await GetAdminNotifications(user.token)

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers user={user}>
          <main className="flex min-h-screen flex-col">
            <NavBar user={user} notifications={notifications} />
            <div className="flex-1">
              {props.children}
              {props.modal}
            </div>
            <Footer user={user} />
            <DonationBanner />
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  )
}
