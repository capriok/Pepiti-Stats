"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Tabs from "~/ui/Tabs"
import { Card, CardContent } from "~/ui/Card"
import PageLayout from "~/components/PageLayout"
import GlobalBlacklistAlert from "~/components/alerts/GlobalBlacklistAlert"
import SafetyBlacklistAlert from "~/components/alerts/SafetyBlacklistAlert"
import BlacklistTable from "~/components/tables/BlacklistTable"
import { Button } from "~/ui/Button"

interface Props {
  blacklistSR: any
  blacklistNonSR: any
}

export default function Blacklists({ blacklistSR, blacklistNonSR }: Props) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") ?? ""

  const items = [
    {
      key: "blacklistNonSr",
      label: "Global Blacklist",
      children: (
        <>
          <GlobalBlacklistAlert />
          <BanAppealButtons />
          <Card>
            <CardContent className="pt-4">
              <BlacklistTable blacklist={blacklistNonSR} />
            </CardContent>
          </Card>
        </>
      ),
    },
    {
      key: "blacklistSr",
      label: "Safety Rating Blacklist",
      children: (
        <>
          <SafetyBlacklistAlert />
          <BanAppealButtons />
          <Card>
            <CardContent className="pt-4">
              <BlacklistTable blacklist={blacklistSR} />
            </CardContent>
          </Card>
        </>
      ),
    },
  ]

  const [tab, setTab] = useState(items[0])

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
      {tab.children}
    </PageLayout>
  )
}

const BanAppealButtons = () => {
  const router = useRouter()

  return (
    <div className="mb-4 flex w-fit flex-wrap justify-center gap-2 md:w-full md:justify-end">
      <Button variant="outline" disabled={true} onClick={() => router.push(`/appeal`)}>
        On-Site Appeal
      </Button>
      <Link target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/mx-bikes">
        <Button variant="outline">Discord Appeal</Button>
      </Link>
    </div>
  )
}
