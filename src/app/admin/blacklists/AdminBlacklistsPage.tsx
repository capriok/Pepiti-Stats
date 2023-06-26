"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "~/ui/Card"
import PageLayout from "~/components/PageLayout"
import Tabs from "~/components/Tabs"
import BlacklistTable from "~/components/tables/BlacklistTable"

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
        title: "Blacklists",
        extra: (
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
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
