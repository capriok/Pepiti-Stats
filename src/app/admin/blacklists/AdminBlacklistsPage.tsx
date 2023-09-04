"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import PageLayout from "~/components/PageLayout"
import Tabs from "~/ui/Tabs"
import { Card, CardContent } from "~/ui/Card"
import BlacklistTable from "~/app/blacklists/components/BlacklistTable"

interface Props {
  blacklistSR: any
  blacklistNonSR: any
}

export default function AdminBlacklistsPage({ blacklistSR, blacklistNonSR }: Props) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") ?? ""

  const items = [
    {
      key: "blacklistNonSr",
      label: "Global Blacklist",
      children: (
        <>
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
        <Card>
          <CardContent className="pt-4">
            <BlacklistTable blacklist={blacklistSR} />
          </CardContent>
        </Card>
      ),
    },
  ]

  const [tab, setTab] = useState(items[0])

  return (
    <PageLayout
      width="app"
      header={{
        backEnabled: true,
        title: "Blacklists",

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
