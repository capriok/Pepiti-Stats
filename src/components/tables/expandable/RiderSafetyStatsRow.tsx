"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderSafetyStats from '~/components/stats/RiderSafetyStats'
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function RiderSafetyStatsRow({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRiderSafetyStatsRow", "color: goldenrod", { rider: rider })

  return (
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Stats
      </div>
      <RiderSafetyStats rider={rider} />
    </>
  )
}
