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

interface Props {
  mmrHistory: Array<RiderMMRHistory>
}

export default function RiderMMRHistoryChart({ mmrHistory }: Props) {
  const [limit, setLimit] = useState(mmrHistory.length > 20 ? 20 : mmrHistory.length)

  console.log("%cRiderMMRHistoryChart", "color: steelblue", { mmrHistory })

  const totaledData = mmrHistory
    .reduce((acc: Array<number>, curr, currIdx) => {
      if (currIdx !== 0) {
        // add each to prev idx
        acc.push(curr.mmr + acc[currIdx - 1])
      } else {
        // Use initial value of 1000
        acc.push(curr.mmr)
      }
      return acc
    }, [])
    .slice(mmrHistory.length - limit)

  const labels = totaledData
    .map((_, idx) => {
      if (idx + 1 === 1) {
        return "Prev race"
      }
      return idx + 1 + " races ago"
    })
    .reverse()

  const chartData = {
    labels,
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
    <div className="w-full p-4 pt-0">
      <div className="m-4 mx-auto flex w-full justify-between">
        <div className="text-lg font-semibold">
          <div>MMR History</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="pr-4 text-accent">{limit} Races</div>
          <div className="btn-group ">
            <button
              className="btn-outline btn-sm btn rounded-r-none border-none bg-base-300 hover:bg-secondary"
              onClick={() => setLimit((l) => (l > 5 ? l - 5 : l))}
            >
              -
            </button>
            <button
              className="btn-outline btn-sm btn rounded-r-none border-none bg-base-300 hover:bg-secondary"
              onClick={() => setLimit((l) => (l < mmrHistory.length ? l + 5 : l))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <Line options={options} data={chartData} />
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
