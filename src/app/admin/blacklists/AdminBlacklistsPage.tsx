"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import PageLayout from "~/components/PageLayout"
import Tabs from "~/components/Tabs"
import GlobalBlacklist from "./components/GlobalBlacklist"
import SRBlacklist from "./components/SRBlacklist"

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
      children: <GlobalBlacklist blacklist={blacklistNonSR} withAlert={false} />,
    },
    {
      key: "blacklistSr",
      label: "Safety Rating Blacklist",
      children: <SRBlacklist blacklist={blacklistSR} withAlert={false} />,
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
