"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderRacesTable from "~/components/tables/rider/RiderRacesTable"

interface Props {
  rider: RiderProfile
}

export default function RacesTab({ rider }: Props) {
  const { data: raceData, isLoading } = useSWR(`/rider/${rider._id}/races`)

  if (isLoading)
    return (
      <div className="mb-4 mt-8">
        <Spinner />
      </div>
    )

  return (
    <div className="p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">Recent Races</div>
      <RiderRacesTable races={raceData.races} />
    </div>
  )
}
