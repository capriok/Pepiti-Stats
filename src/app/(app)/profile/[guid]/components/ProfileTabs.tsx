"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useUserContext } from "~/app/providers"
import Tabs from "~/components/Tabs"
import RiderMMRHistoryChart from "./tabs/RiderMMRHistoryChart"
import RiderRacesTable from "./tabs/RiderRacesTable"
import RiderRecordsTable from "./tabs/RiderRecordsTable"
import RiderLeaguesList from "./tabs/RiderLeaguesList"
import RiderSeasonStats from "./tabs/RiderSeasonStats"
import { RiderWorldRecordsStats } from "~/components/tables/expandable/RiderWorldRecordsStats"

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
      children: (
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col">
            <RiderSeasonStats seasons={rider.seasons} />
          </div>
          <div className="w-full gap-5 md:min-h-[420px] md:min-w-[40%]">
            <RiderMMRHistoryChart mmrHistory={mmrHistory} />
          </div>
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
          <div className="my-4 whitespace-nowrap text-xl font-semibold">World Record Stats</div>
          <div className="mb-4">
            <RiderWorldRecordsStats rider={rider} />
          </div>
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
          <RiderLeaguesList user={user} />
        </div>
      ),
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
