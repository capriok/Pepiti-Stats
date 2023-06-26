"use client"

import { usePathname } from "next/navigation"
import { useUserContext } from "~/app/providers"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import BlacklistTable from "~/components/tables/BlacklistTable"
import { Hammer } from "lucide-react"

interface Props {
  blacklist: any
  withAlert?: boolean
}

export default function SRBlacklist({ blacklist, withAlert = true }: Props) {
  const user = useUserContext()
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && user.isAdmin

  return (
    <>
      {withAlert && (
        <Alert className="mb-4 border-warning">
          <Hammer size={20} />
          <AlertTitle>Safety Rating</AlertTitle>
          <AlertDescription>
            If youre on this list, you have a Safety Rating below 950, race in a banned/no-contact
            server to build your SR back up
          </AlertDescription>
        </Alert>
      )}
      <div className="card card-body w-full overflow-hidden border border-accent/40 bg-base-200 p-4">
        <BlacklistTable blacklist={blacklist} isAdministrating={isAdministrating} />
      </div>
    </>
  )
}
