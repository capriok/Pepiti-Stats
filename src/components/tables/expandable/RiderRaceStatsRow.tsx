"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"
import RiderRaceStats from "~/components/stats/RiderRaceStats"

export default function RiderRaceStatsRow({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRiderRaceStatsRow", "color: goldenrod", { rider: rider })

  return (
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Race Stats
      </div>
      <RiderRaceStats rider={rider} />
    </>
  )
}
