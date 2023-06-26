"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import PageLayout from "~/components/PageLayout"
import { useUserContext } from "~/app/providers"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import BlacklistTable from "~/components/tables/BlacklistTable"
import Tabs from "~/components/Tabs"
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

  const items = [
    {
      key: "blacklistNonSr",
      label: "Global Blacklist",
      children: (
        <div className="p-4">
          {!isAdministrating && (
            <>
              <BlacklistAlert
                type="error"
                title="Global"
                text="If youre on this list, you did something worthy of being banned from online racing for the foreseeable future"
              />
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
                title="Safety Rating"
                text="If youre on this list, you have a Safety Rating below 950, race in a banned/no-contact server to build your SR back up"
              />
            </>
          )}
          <BlacklistTable blacklist={blacklistSR} isAdministrating={isAdministrating} />
        </div>
      ),
    },
  ]

  const [tab, setTab] = useState(items[1])

  return (
    <PageLayout
      width="app"
      header={{
        title: "Blacklists",
        extra: (
          <div className="text-sm text-accent">Be sure to check the Global and SR blacklists</div>
        ),
        subExtra: (
          <Tabs
            items={items}
            defaultActive={tabParam}
            onChange={(tab) => setTab(tab)}
            renderChildren={false}
          />
        ),
      }}
    >
      <BanAppealButtons />
      {tab.children}
    </PageLayout>
  )
}

const BlacklistAlert = ({ type, text, title }) => {
  const map = {
    warning: "border-warning",
    error: "border-error",
  }

  return (
    <Alert className={`mb-4 ${map[type]}`}>
      <Hammer size={20} />
      <AlertTitle>{title}</AlertTitle>
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
