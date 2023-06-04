"use client"

import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import Spinner from "~/components/Spinner"

export default function SRRecordsRiderRacesRow({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`, fetcher)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cSRRecordsRiderRacesRow", "color: goldenrod", { races: rider })

  return (
    <div className="pr-4">
      <div className="mb-2 text-lg font-semibold">{row.name}&apos;s Stats</div>
      <div className="stats flex w-full bg-base-100/60 text-center shadow-lg dark:bg-base-100">
        <div className="stat w-full text-center">
          <div className="stat-title">Laps</div>
          <div className="stat-value py-2 text-2xl">{rider.total_laps}</div>
          <div className="stat-description">Total Laps</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">SR</div>
          <div className="stat-value py-2 text-2xl">{rider.SR}</div>
          <div className="stat-description">Safety Rating</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Contacts</div>
          <div className="stat-value py-2 text-2xl">{rider.contact}</div>
          <div className="stat-description">Contact with others</div>
        </div>
      </div>
    </div>
  )
}
