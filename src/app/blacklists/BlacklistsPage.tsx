"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Tabs from "~/ui/Tabs"
import { Card, CardContent } from "~/ui/Card"
import PageLayout from "~/components/PageLayout"
import GlobalBlacklistAlert from "~/components/alerts/GlobalBlacklistAlert"
import SafetyBlacklistAlert from "~/components/alerts/SafetyBlacklistAlert"
import BlacklistTable from "~/components/tables/BlacklistTable"

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
