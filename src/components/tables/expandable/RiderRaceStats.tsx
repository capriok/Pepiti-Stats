"use client"

import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import Spinner from "~/components/Spinner"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function RiderRaceStats({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRiderRaceStats", "color: goldenrod", { rider: rider })

  return (
    <div className="pr-4">
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Race Stats
      </div>
      <div className="stats flex w-full bg-base-100/60 text-center shadow-lg dark:bg-base-100">
        <div className="stat w-full text-center">
          <div className="stat-title">First</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.first.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Second</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.second.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Third</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.third.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Races</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.total_races.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Fastest Laps</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.fastlap.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Holeshots</div>
          <div className="stat-value pt-2 text-2xl">{rider.races.holeshot.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
