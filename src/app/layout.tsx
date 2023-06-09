import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  keywords:
    "Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods",
}

import { Providers } from "./providers"
import { Toaster } from "~/ui/Toaster"
import GetAuthUser from "~/api"
import NavBar from "~/components/Navbar"
import Footer from "~/components/Footer"

import "~/globals.css"

interface Props {
  children: React.ReactNode
}

export default async function RootLayout(props: Props) {
  const user = await GetAuthUser()

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers user={user}>
          <main className="flex min-h-screen flex-col">
            <NavBar user={user} />
            <div className="flex-1">{props.children}</div>
            <Footer user={user} />
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  )
}
