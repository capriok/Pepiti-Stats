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
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { PowerOff } from "lucide-react"
import { Button } from "~/ui/Button"
import "~/globals.css"

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
              <Alert className="flex justify-center py-4">
                <div className="flex flex-col items-center justify-center">
                  <PowerOff size={40} className="mb-4 ml-auto w-full text-primary" />
                  <AlertTitle>Attention!</AlertTitle>
                  <AlertDescription className="mt-2">
                    Pepiti Servers are shut down, Pepiti lost interest.
                  </AlertDescription>
                  <AlertDescription className="mt-2 text-center">
                    <div>Tooky and PDR have created a new platform at MXB-Races.com</div>
                    <Button variant="info" size="sm" className="mt-4">
                      <a href="https://mxb-races.com" className="text-sm">
                        Visit New Platform
                      </a>
                    </Button>
                  </AlertDescription>
                </div>
              </Alert>
              {props.children}
              {props.modal}
            </div>
            <Footer user={user} />
            {/* <DonationBanner /> */}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  )
}
