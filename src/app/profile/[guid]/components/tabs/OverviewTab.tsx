"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderSeasonStats from "~/components/stats/RiderSeasonStats"
import RiderMMRHistoryChart from "~/components/charts/RiderMMRHistoryChart"
import RiderPositionHistoryChart from "~/components/charts/RiderPositionHistoryChart"

interface Props {
  riderId: string
  seasons: Array<LeagueSeason>
  mmrHistory: Array<RiderMMRHistory>
}

export default function OverviewTab({ riderId, seasons, mmrHistory }: Props) {
  return (
    <div className="flex flex-col">
      <div className="my-10 w-full px-0">
        <RiderSeasonStats seasons={seasons} />
      </div>
      <Charts mmrHistory={mmrHistory} riderId={riderId} />
    </div>
  )
}

const Charts = ({ mmrHistory, riderId }) => {
  const { data: raceData, isLoading } = useSWR(`/rider/${riderId}/races`)

  if (isLoading)
    return (
      <div className="py-4 pb-10">
        <Spinner />
      </div>
    )

  return (
    <div className="flex w-full flex-col max-lg:flex-wrap lg:flex-row">
      <RiderMMRHistoryChart mmrHistory={mmrHistory} />
      <RiderPositionHistoryChart races={raceData.races} />
    </div>
  )
}
