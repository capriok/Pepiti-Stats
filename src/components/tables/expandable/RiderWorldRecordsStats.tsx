"use client"

import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import Spinner from "~/components/Spinner"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function RiderWorldRecordsStats({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRiderWorldRecordsStats", "color: goldenrod", { rider: rider })

  return (
    <div className="pr-4">
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Stats
      </div>
      <div className="stats flex w-full bg-base-100/60 text-center shadow-lg dark:bg-base-100">
        <div className="stat w-full text-center">
          <div className="stat-title">MX1 OEM</div>
          <div className="stat-value mt-2 text-2xl">
            {rider.world_records["MX1 OEM"].toLocaleString()}
          </div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">MX1-2T OEM</div>
          <div className="stat-value mt-2 text-2xl">
            {rider.world_records["MX1-2T OEM"].toLocaleString()}
          </div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">MX2 OEM</div>
          <div className="stat-value mt-2 text-2xl">
            {rider.world_records["MX2 OEM"].toLocaleString()}
          </div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">MX2-2T OEM</div>
          <div className="stat-value mt-2 text-2xl">
            {rider.world_records["MX2-2T OEM"].toLocaleString()}
          </div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">total</div>
          <div className="stat-value mt-2 text-3xl text-secondary">
            {rider.world_records["total"].toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
