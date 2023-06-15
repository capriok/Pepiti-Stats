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
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Stats
      </div>
      <RiderWorldRecordsStats rider={rider} />
    </>
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
      <div className="stat-title">450 Class</div>
      <div className="stat-value mt-2 text-xl">
        {(
          rider.world_records["MX1 OEM"] +
          rider.world_records["FACTORY 450"] +
          rider.world_records["MX1-2T OEM"]
        ).toLocaleString()}
      </div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">250 Class</div>
      <div className="stat-value mt-2 text-xl">
        {(rider.world_records["MX2 OEM"] + rider.world_records["FACTORY 250"]).toLocaleString()}
      </div>
    </div>
    <div className="stat w-full text-center">
      <div className="stat-title">Lights</div>
      <div className="stat-value mt-2 text-xl">
        {(
          rider.world_records["MX2-2T OEM"] +
          rider.world_records["FACTORY 125"] +
          rider.world_records["FACTORY 150"]
        ).toLocaleString()}
      </div>
    </div>
  </div>
)
