"use client"

import { usePathname } from "next/navigation"
import { useUserContext } from "~/app/providers"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import BlacklistTable from "~/components/tables/BlacklistTable"
import { Hammer } from "lucide-react"

interface Props {
  blacklist: any
}

export default function GlobalBlacklist({ blacklist }: Props) {
  const user = useUserContext()
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && user.isAdmin

  console.log(blacklist.length)

  return (
    <>
      <Alert className="mb-4 border-error">
        <Hammer size={20} />
        <AlertTitle>Global</AlertTitle>
        <AlertDescription>
          If youre on this list, you did something worthy of being banned from online racing for the
          foreseeable future
        </AlertDescription>
      </Alert>
      <div className="card card-body w-full overflow-hidden border border-accent/40 bg-base-200 p-4">
        <BlacklistTable blacklist={blacklist} isAdministrating={isAdministrating} />
      </div>
    </>
  )
}
