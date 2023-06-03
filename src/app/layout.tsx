import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  keywords:
    "Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods",
}

import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./providers"
import { Toaster } from "~/ui/Toaster"
import getAuthUser from "~/api/getAuthUser"
import NavBar from "~/components/Navbar"
import Footer from "~/components/Footer"

import "~/globals.css"

interface Props {
  children: React.ReactNode
}

export default async function RootLayout(props: Props) {
  const user = await getAuthUser()

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col">
            <NavBar user={user} />
            <div className="flex-1">{props.children}</div>
            <Footer user={user} />
            <Toaster />
            {/* <Analytics /> */}
          </main>
        </Providers>
      </body>
    </html>
  )
}
