"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { Button } from "~/ui/Button"

interface Props {
  races: Array<any>
}

export default function RiderPositionHistoryChart({ races }: Props) {
  const theme = useTheme()
  const [days, setDays] = useState(30)

  const labels = ["First", "Second", "Third", "Top 5", "Top 10"]

  const reducePosition = (acc, curr) => {
    const pos = curr?.Classification?.Pos ?? 0
    pos === 1 && acc[0]++
    pos === 2 && acc[1]++
    pos === 3 && acc[2]++
    pos > 3 && pos <= 5 && acc[3]++
    pos > 5 && pos <= 10 && acc[4]++
    return acc
  }

  const data: any = {
    labels: labels,
    datasets: [
      {
        label: "Career",
        data: races.reduce(
          reducePosition,
          labels.map((_) => 0)
        ),
        backgroundColor:
          theme.theme === "light" ? ["rgba(140, 140, 140, 0.2)"] : ["rgba(200, 200, 205, 0.2)"],
        borderColor: theme.theme === "light" ? ["rgb(140, 140, 140)"] : ["rgb(200, 200, 205)"],
        borderWidth: 1,
      },
      {
        label: "Season",
        data: races.reduce(
          (acc, curr) => {
            const date = parseInt(curr._id.slice(0, 8), 16) * 1000
            if (!inLastXDays(90, date)) return acc
            return reducePosition(acc, curr)
          },
          labels.map((_) => 0)
        ),
        backgroundColor: ["rgba(21, 81, 131, 0.2)"],
        borderColor: ["rgb(21, 81, 131)"],
        borderWidth: 1,
      },
      {
        label: `Last ${days}`,
        data: races.reduce(
          (acc, curr) => {
            const date = parseInt(curr._id.slice(0, 8), 16) * 1000
            if (!inLastXDays(days, date)) return acc
            return reducePosition(acc, curr)
          },
          labels.map((_) => 0)
        ),
        backgroundColor: ["rgba(54, 162, 80, 0.2)"],
        borderColor: ["rgb(54, 162, 80)"],
        borderWidth: 1,
      },
    ],
  }

  const config: any = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }
  return (
    <div className="w-full p-4">
      <div className="m-4 mx-auto flex w-full justify-between">
        <div className="text-lg font-semibold">
          <div>Race History</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="pr-4 text-sm text-accent">{days} Days</div>
          <div className="join">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDays((days) => (days > 30 ? days - 30 : days))}
              disabled={days === 30}
            >
              -
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDays((days) => (days < 180 ? days + 30 : days))}
              disabled={days === 180}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <Bar options={config} data={data} />
    </div>
  )
}

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend)

function inLastXDays(days, date) {
  var currentDate = new Date()
  var daysAgo = new Date()
  daysAgo.setDate(currentDate.getDate() - days)
  return date >= daysAgo && date <= currentDate
}
