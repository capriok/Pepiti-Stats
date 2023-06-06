"use client"

import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import Spinner from "~/components/Spinner"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"

export default function BlacklistRiderStatsRow({ row, isAdministrating }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`, fetcher)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cBlacklistRiderStatsRow", "color: goldenrod", { rider: rider })

  return (
    <div className="pr-4">
      <div className="mb-2 flex w-full justify-between">
        <div className="text-lg font-semibold">{row.name}&apos;s Stats</div>
        {isAdministrating && (
          <div className="text-lg font-semibold">
            <UnbanRiderButton riderId={rider._id} name={rider.name} hackit={true} />
          </div>
        )}
      </div>
      <div className="stats flex w-full bg-base-100/60 text-center shadow-lg dark:bg-base-100">
        <div className="stat w-full text-center">
          <div className="stat-title">Laps</div>
          <div className="stat-value pt-2 text-2xl">{rider.total_laps}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">SR</div>
          <div className={`stat-value pt-2 text-2xl ${rider.SR < 950 ? "text-error" : ""}`}>
            {rider.SR}
          </div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Contacts</div>
          <div className="stat-value pt-2 text-2xl">{rider.contact}</div>
        </div>
      </div>
    </div>
  )
}
