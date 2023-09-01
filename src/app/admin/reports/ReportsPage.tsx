"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import PageLayout from "~/components/PageLayout"
import Tabs from "~/ui/Tabs"
import ReportList from "./components/ReportList"

export default function ReportsPage({ openReports, closedReports }) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") ?? ""

  console.log("%cRiderReports", "color: steelblue", { openReports, closedReports })

  const items = [
    {
      key: "open",
      label: "Open",
      children: <ReportList status="open" reports={openReports} />,
    },
    {
      key: "closed",
      label: "Closed",
      children: <ReportList status="closed" reports={closedReports} />,
    },
  ]

  const [tab, setTab] = useState(items[0])

  return (
    <PageLayout
      width="feed"
      header={{
        backEnabled: true,
        title: "Rider Reports",

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
