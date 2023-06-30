"use client"

import { useUserContext } from "~/app/providers"
import Tabs from "~/ui/Tabs"
import OverviewTab from "./tabs/OverviewTab"
import RacesTab from "./tabs/RacesTab"
import RecordsTab from "./tabs/RecordsTab"
import LeaguesTab from "./tabs/LeaguesTab"
import { Card } from "~/ui/Card"

interface Props {
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
}

export default function ProfileTabs({ rider, mmrHistory }: Props) {
  const user = useUserContext()
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
    <Card className="mt-20">
      <Tabs items={items} wide={true} />
    </Card>
  )
}
