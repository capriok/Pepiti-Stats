"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useUserContext } from "~/app/providers"
import BlacklistTable from "~/components/tables/BlacklistTable"
import Tabs from "~/components/Tabs"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Hammer } from "lucide-react"

interface Props {
  blacklistSR: any
  blacklistNonSR: any
}

export default function Blacklists({ blacklistSR, blacklistNonSR }: Props) {
  const user = useUserContext()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") ?? ""
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && user.isAdmin

  const tabs = [
    {
      key: "blacklistNonSr",
      label: "Global Blacklist",
      children: (
        <div className="p-4">
          {!isAdministrating && (
            <>
              <BlacklistAlert
                type="error"
                text="If youre on this list, you did something worthy of being banned from online racing for the foreseeable future"
              />
              <BanAppealButtons />
            </>
          )}
          <BlacklistTable blacklist={blacklistNonSR} isAdministrating={isAdministrating} />
        </div>
      ),
    },
    {
      key: "blacklistSr",
      label: "Safety Rating Blacklist",
      children: (
        <div className="p-4">
          {!isAdministrating && (
            <>
              <BlacklistAlert
                type="warning"
                text="If youre on this list, you have a Safety Rating below 950, race in a banned/no-contact server to build your SR back up"
              />
              <BanAppealButtons />
            </>
          )}
          <BlacklistTable blacklist={blacklistSR} isAdministrating={isAdministrating} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex justify-center">
      <div className="card card-body w-full overflow-hidden  border border-accent/40 bg-base-200 p-0">
        <Tabs items={tabs} wide={true} defaultActive={tabParam} />
      </div>
    </div>
  )
}

const BlacklistAlert = ({ text, type }) => {
  const map = {
    warning: "border-warning",
    error: "border-error",
  }

  return (
    <Alert className={`mb-4 bg-base-100 ${map[type]}`}>
      <Hammer size={20} />
      <AlertTitle>Disclaimer.</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

const BanAppealButtons = () => {
  const router = useRouter()

  return (
    <div className="mb-4 flex w-fit flex-wrap justify-center gap-2 md:mb-0 md:w-full md:justify-end">
      <button
        disabled={true}
        className="btn-ghost btn-outline btn-sm btn"
        onClick={() => router.push(`/appeal`)}
      >
        On-Site Appeal
      </button>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://discord.com/invite/mx-bikes"
        className="btn-ghost btn-outline btn-sm btn"
      >
        Discord Appeal
      </Link>
    </div>
  )
}
