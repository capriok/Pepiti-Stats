"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderRacesTable, {
  riderRacesColumnsWithControls,
} from "~/components/tables/rider/RiderRacesTable"

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

  const sortingKeys = ["date", "position", "penalties", "mmrGain", "newMMR"]

  return (
    <div className="p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">Recent Races</div>
      <RiderRacesTable
        races={raceData.races}
        columns={riderRacesColumnsWithControls}
        sortingKeys={sortingKeys}
      />
    </div>
  )
}
