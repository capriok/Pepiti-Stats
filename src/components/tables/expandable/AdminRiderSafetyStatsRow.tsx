"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"
import RiderSafetyStats from '~/components/stats/RiderSafetyStats'

export default function AdminRiderSafetyStatsRow({ row, isAdministrating }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cAdminRiderSafetyStatsRow", "color: goldenrod", { rider: rider })

  return (
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Stats
      </div>
      <RiderSafetyStats rider={rider} isAdministrating={isAdministrating} />
    </>
  )
}
