"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useUserContext } from "~/app/providers"
import Tabs from "~/components/Tabs"
import OverviewTab from "./tabs/OverviewTab"
import RacesTab from "./tabs/RacesTab"
import RecordsTab from "./tabs/RecordsTab"
import LeaguesTab from "./tabs/LeaguesTab"

interface Props {
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
}

export default function ProfileTabs({ rider, mmrHistory }: Props) {
  const user = useUserContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")!
  const isUserProfile = user.guid === rider._id

  const items = [
    {
      key: "overview",
      label: "Overview",
      children: <OverviewTab riderId={rider._id} seasons={rider.seasons} mmrHistory={mmrHistory} />,
    },
    {
      key: "races",
      label: "Races",
      children: <RacesTab rider={rider} />,
    },
    {
      key: "records",
      label: "Records",
      children: <RecordsTab rider={rider} />,
    },
  ]

  if (isUserProfile)
    items.push({
      key: "leagues",
      label: "Leagues",
      children: <LeaguesTab />,
    })

  return (
    <div className="card-body mt-20 rounded-lg bg-base-200 p-0">
      <Tabs
        items={items}
        wide={true}
        defaultActive={tabParam}
        onChange={(item) => router.push(`${pathname}?tab=${item.key}`)}
      />
    </div>
  )
}
