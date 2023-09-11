"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Button } from "~/ui/Button"

interface Props {
  mmrHistory: Array<RiderMMRHistory>
  season: LeagueSeason
}

export default function RiderMMRHistoryChart({ mmrHistory, season }: Props) {
  const [limit, setLimit] = useState(mmrHistory.length > 20 ? 20 : mmrHistory.length)

  console.log("%cRiderMMRHistoryChart", "color: steelblue", { mmrHistory })

  const reduceMMR = (acc: Array<number>, curr, currIdx) => {
    currIdx !== 0 ? acc.push(curr.mmr + acc[currIdx - 1]) : acc.push(curr.mmr)
    return acc
  }

  const thisSeasonsHistory = mmrHistory
  // ? uncomment this when pepiti supports mmr history per season
  // .filter(({ timestamp }) => {
  //   return isThisSeason(new Date(timestamp * 1000), season.start!, season.end!)
  // })

  const totaledData = thisSeasonsHistory.reduce(reduceMMR, []).slice(mmrHistory.length - limit)

  const data = {
    labels: totaledData
      .map((_, idx) => (idx + 1 === 1 ? "Prev race" : idx + 1 + " races ago"))
      .reverse(),
    datasets: [
      {
        label: "Total MMR",
        data: totaledData,
        borderColor: "#37B24D",
        backgroundColor: "rgba(55, 178, 77, 0.4)",
        lineTension: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="w-full p-4">
      <div className="m-4 mx-auto flex w-full justify-between">
        <div className="text-lg font-semibold">
          <div>MMR History</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="pr-4 text-sm text-accent">{limit} Races</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLimit((l) => (l > 5 ? l - 5 : l))}
            disabled={limit <= 5}
          >
            -
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLimit((l) => (l < mmrHistory.length ? l + 5 : l))}
            disabled={limit >= mmrHistory.length - 1}
          >
            +
          </Button>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  )
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)
