import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderSeasonStats from "./components/RiderSeasonStats"
import RiderMMRHistoryChart from "./components/RiderMMRHistoryChart"
import RiderPodiumHistoryChart from "./components/RiderPodiumHistoryChart"

interface Props {
  riderId: string
  seasons: Array<LeagueSeason>
  mmrHistory: Array<RiderMMRHistory>
}

export default function OverviewTab({ riderId, seasons, mmrHistory }: Props) {
  const { data: raceData, isLoading } = useSWR(`/rider/${riderId}/races`)

  return (
    <div className="flex flex-col gap-10">
      <div className=" w-full">
        <RiderSeasonStats seasons={seasons} />
      </div>
      <Charts mmrHistory={mmrHistory} races={raceData?.races} loading={isLoading} />
    </div>
  )
}

const Charts = ({ mmrHistory, races, loading }) => {
  if (loading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  return (
    <div className="flex w-full">
      <RiderMMRHistoryChart mmrHistory={mmrHistory} />
      <RiderPodiumHistoryChart races={races} />
    </div>
  )
}
