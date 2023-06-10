import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderSeasonStats from "./components/RiderSeasonStats"
import RiderMMRHistoryChart from "./components/RiderMMRHistoryChart"
import RiderPositionHistoryChart from "./components/RiderPositionHistoryChart"

interface Props {
  riderId: string
  seasons: Array<LeagueSeason>
  mmrHistory: Array<RiderMMRHistory>
}

export default function OverviewTab({ riderId, seasons, mmrHistory }: Props) {
  const { data: raceData, isLoading } = useSWR(`/rider/${riderId}/races`)

  return (
    <div className="flex flex-col">
      <div className="mb-10 w-full px-0">
        <RiderSeasonStats seasons={seasons} />
      </div>
      <Charts mmrHistory={mmrHistory} races={raceData?.races} loading={isLoading} />
    </div>
  )
}

const Charts = ({ mmrHistory, races, loading }) => {
  if (loading)
    return (
      <div className="py-4 pb-10">
        <Spinner />
      </div>
    )

  return (
    <div className="flex w-full flex-col max-lg:flex-wrap lg:flex-row">
      <RiderMMRHistoryChart mmrHistory={mmrHistory} />
      <RiderPositionHistoryChart races={races} />
    </div>
  )
}
