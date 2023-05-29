"use client"

import Tabs from "~/components/Tabs"
import RiderWorldRecordsTable from "./tabs/RiderWorldRecordsTable"
import RiderMMRHistoryChart from "./tabs/RiderMMRHistoryChart"
import RiderRacesTable from "./tabs/RiderRacesTable"
import RiderRecordsTable from "./tabs/RiderRecordsTable"
import RiderLeaguesList from "./tabs/RiderLeaguesList"

interface Props {
  user: User
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
  leagues: Array<League>
}

export default function ProfileTabs({ user, rider, mmrHistory, leagues }: Props) {
  const isUserProfile = user.guid === rider._id

  const items = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <div className="flex min-h-[420px] flex-col gap-5 md:flex-row">
          <RiderWorldRecordsTable worldRecords={rider.world_records} />
          <RiderMMRHistoryChart mmrHistory={mmrHistory} />
        </div>
      ),
    },
    {
      key: "races",
      label: "Races",
      children: (
        <div className="p-4 pt-0">
          <div className="my-4 whitespace-nowrap text-xl font-semibold">Recent Races</div>
          <RiderRacesTable guid={rider._id} />
        </div>
      ),
    },
    {
      key: "records",
      label: "Records",
      children: (
        <div className="p-4 pt-0">
          <div className="my-4 whitespace-nowrap text-xl font-semibold">Personal Records</div>
          <RiderRecordsTable guid={rider._id} />
        </div>
      ),
    },
  ]

  if (isUserProfile)
    items.push({
      key: "leagues",
      label: "Leagues",
      children: (
        <div className="p-4 pt-0">
          <div className="my-4 whitespace-nowrap text-xl font-semibold">My Leagues</div>
          <RiderLeaguesList user={user} leagues={leagues} />
        </div>
      ),
    })

  return (
    <div className="card-body mt-20 rounded-lg bg-base-200 p-0">
      <Tabs items={items} wide={true} />
    </div>
  )
}
