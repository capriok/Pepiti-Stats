"use client"

import { useUserContext } from "~/providers/UserProvider"
import Tabs from "~/ui/Tabs"
import OverviewTab from "./tabs/OverviewTab"
import RacesTab from "./tabs/RacesTab"
import RecordsTab from "./tabs/RecordsTab"
import LeaguesTab from "./tabs/LeaguesTab"
import { Card } from "~/ui/Card"
import { useRouter, useSearchParams } from "next/navigation"

interface Props {
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
}

export default function ProfileTabs({ rider, mmrHistory }: Props) {
  const router = useRouter()
  const user = useUserContext()
  const isAdmin = user.isAdmin
  const isUserProfile = user.guid === rider._id
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

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

  if (isUserProfile && isAdmin)
    items.push({
      key: "leagues",
      label: "Leagues",
      children: <LeaguesTab />,
    })

  const handleTabChange = (item) => {
    router.replace(`/profile/${rider._id}?tab=${item.key}`)
  }

  return (
    <Card className="mt-20">
      <Tabs items={items} defaultActive={tabParam ?? ""} onChange={handleTabChange} wide={true} />
    </Card>
  )
}
