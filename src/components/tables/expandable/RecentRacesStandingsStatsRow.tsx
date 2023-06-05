"use client"

import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import Spinner from "~/components/Spinner"

export default function RecentRacesStandingsStatsRow({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`, fetcher)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRecentRacesStandingsStatsRow", "color: goldenrod", { rider: rider })

  return (
    <div className="pr-4">
      <div className="mb-2 text-lg font-semibold">{row.name}&apos;s Race Stats</div>
      <div className="stats flex w-full bg-base-100/60 text-center shadow-lg dark:bg-base-100">
        <div className="stat w-full text-center">
          <div className="stat-title">First</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.first}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Second</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.second}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Third</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.third}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Races</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.total_races}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Fastest Laps</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.fastlap}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Holeshots</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.holeshot}</div>
        </div>
      </div>
    </div>
  )
}
