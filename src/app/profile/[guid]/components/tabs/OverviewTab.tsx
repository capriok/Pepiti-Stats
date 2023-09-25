"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderSeasonStats from "~/components/stats/RiderSeasonStats"
import RiderMMRHistoryChart from "~/components/charts/RiderMMRHistoryChart"
import RiderPositionHistoryChart from "~/components/charts/RiderPositionHistoryChart"
import { useState } from "react"

interface Props {
  riderId: string
  seasons: Array<RiderSeason>
  mmrHistory: Array<RiderMMRHistory>
}

export default function OverviewTab({ riderId, seasons, mmrHistory }: Props) {
  const formattedSeasons = seasons.map((s) => {
    let name = s.name.toLocaleLowerCase()

    if (name === "first season") {
      return {
        ...s,
        name: "Summer 2023",
        start: new Date("2023-06-01"),
        end: new Date("2023-09-01"),
      }
    }
    if (name === "first autumn") {
      return {
        ...s,
        name: "Autumn 2023",
        start: new Date("2023-09-01"),
        end: new Date("2023-12-01"),
      }
    }

    return { ...s, name }
  })

  const [season, setSeason] = useState(formattedSeasons[0])

  return (
    <div className="flex flex-col">
      <div className="my-10 w-full px-0">
        <RiderSeasonStats seasons={formattedSeasons} season={season} setSeason={setSeason} />
      </div>
      <Charts mmrHistory={mmrHistory} riderId={riderId} season={season} />
    </div>
  )
}

const Charts = ({ mmrHistory, riderId, season }) => {
  const { data: raceData, isLoading } = useSWR(`/rider/${riderId}/races`)

  if (isLoading)
    return (
      <div className="py-4 pb-10">
        <Spinner />
      </div>
    )

  return (
    <div className="flex w-full flex-col max-lg:flex-wrap lg:flex-row">
      <RiderMMRHistoryChart mmrHistory={mmrHistory} season={season} />
      <RiderPositionHistoryChart races={raceData.races} season={season} />
    </div>
  )
}
