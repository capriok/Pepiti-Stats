"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function RiderWorldRecordsStatsRow({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRiderWorldRecordsStatsRow", "color: goldenrod", { rider: rider })

  return (
    <div className="pr-4">
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Stats
      </div>
      <RiderWorldRecordsStats rider={rider} />
    </div>
  )
}

export const RiderWorldRecordsStats = ({ rider }) => (
  <div className="stats flex w-full bg-base-100/60 text-center shadow-md dark:bg-base-100">
    <div className="stat w-full text-center">
      <div className="stat-title">Total</div>
      <div className="stat-value mt-2 text-xl text-secondary">
        {rider.world_records["total"].toLocaleString()}
      </div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">MX1 OEM</div>
      <div className="stat-value mt-2 text-xl">
        {rider.world_records["MX1 OEM"].toLocaleString()}
      </div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">MX1-2T OEM</div>
      <div className="stat-value mt-2 text-xl">
        {rider.world_records["MX1-2T OEM"].toLocaleString()}
      </div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">MX2 OEM</div>
      <div className="stat-value mt-2 text-xl">
        {rider.world_records["MX2 OEM"].toLocaleString()}
      </div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">MX2-2T OEM</div>
      <div className="stat-value mt-2 text-xl">
        {rider.world_records["MX2-2T OEM"].toLocaleString()}
      </div>
    </div>
  </div>
)
