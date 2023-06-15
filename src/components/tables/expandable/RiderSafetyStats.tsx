"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
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

export const RiderSafetyStats = ({ rider }) => (
  <div className="stats flex w-full bg-base-100/60 text-center shadow-md dark:bg-base-100">
    <div className="stat w-full text-center">
      <div className="stat-title">Laps</div>
      <div className="stat-value pt-2 text-2xl">{rider.total_laps.toLocaleString()}</div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">Safety Rating</div>
      <div className="stat-value pt-2 text-2xl">{rider.SR.toLocaleString()}</div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">Contacts</div>
      <div className="stat-value pt-2 text-2xl">{rider.contact.toLocaleString()}</div>
    </div>
  </div>
)
