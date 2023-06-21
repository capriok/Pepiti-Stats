import React from "react"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { Scatter } from "react-chartjs-2"
import { handleLapTimes } from "~/utils/handleLapTimes"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export const options = {
  scales: {
    y: {
      title: { display: true, text: "Fastest Lap" },
      beginAtZero: false,
      ticks: {
        callback: (val, idx, ticks) => {
          return `${handleLapTimes(val)}`
        },
      },
    },
    x: {
      title: { display: true, text: "Race Time" },
      beginAtZero: false,
      ticks: {
        callback: (val, idx, ticks) => {
          return `${handleLapTimes(val)}`
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (val) => {
          return [`FL: ${handleLapTimes(val.raw.y)}`, `RT: ${handleLapTimes(val.raw.x)}`]
        },
      },
    },
  },
  elements: {
    point: {
      radius: 5,
    },
  },
}

export function RaceScatter({ standings }) {
  const data = {
    labels: standings.map((stat) => `${handlePlaceSuffix(stat.position)} - ${stat.name}`),
    datasets: [
      {
        label: "Race Time vs. Fastest Lap",
        data: standings
          .filter((stat) => stat.raceTime > 0 && stat.raceTime !== "-" && stat.fastestLap > 0)
          .map((stat) => {
            return {
              x: stat.raceTime,
              y: stat.fastestLap,
            }
          }),
        backgroundColor: "#23bd38",
      },
    ],
  }

  return <Scatter options={options} data={data} />
}
