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
    tooltipText: standings.map((stat) => [0, 1]),
    datasets: [
      {
        label: "Race Time vs. Fastest Lap",
        data: standings.map((stat) => ({
          x: stat.raceTime,
          y: stat.fastestLap,
        })),
        backgroundColor: "#23bd38",
      },
    ],
  }

  return <Scatter options={options} data={data} />
}
