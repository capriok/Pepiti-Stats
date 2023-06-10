"use client"

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
import { Bar, Line } from "react-chartjs-2"

interface Props {
  races: Array<any>
}

export default function RiderPodiumHistoryChart({ races }: Props) {
  console.log(races)

  const styles = {
    backgroundColor: [
      "rgba(255, 220, 65, 0.2)",
      "rgba(201, 203, 207, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(54, 162, 80, 0.2)",
      "rgba(20, 80, 120, 0.2)",
    ],
    borderColor: [
      "rgb(255, 220, 65)",
      "rgb(201, 203, 207)",
      "rgb(255, 159, 64)",
      "rgb(54, 162, 80)",
      "rgb(20, 80, 120)",
    ],
    borderWidth: 1,
  }

  const labels = ["First", "Second", "Third", "Top 5", "Top 10"]
  const data: any = {
    labels: labels,
    datasets: [
      {
        label: "Career",
        data: races.reduce(
          (acc, curr) => {
            const pos = curr?.Classification?.Pos ?? 0
            pos === 1 && acc[0]++
            pos === 2 && acc[1]++
            pos === 3 && acc[2]++
            pos > 3 && pos <= 5 && acc[3]++
            pos > 5 && pos <= 10 && acc[4]++
            return acc
          },
          [0, 0, 0, 0, 0]
        ),
        ...styles,
      },
      {
        label: "Last Month",
        data: races.reduce(
          (acc, curr) => {
            const date = parseInt(curr._id.slice(0, 8), 16) * 1000
            if (!inLastMonth(date)) return acc

            const pos = curr?.Classification?.Pos ?? 0
            pos === 1 && acc[0]++
            pos === 2 && acc[1]++
            pos === 3 && acc[2]++
            pos > 3 && pos <= 5 && acc[3]++
            pos > 5 && pos <= 10 && acc[4]++
            return acc
          },
          [0, 0, 0, 0, 0]
        ),
        ...styles,
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
    <div className="w-full p-4 pt-0">
      <div className="m-4 mx-auto flex w-full justify-between">
        <div className="text-lg font-semibold">
          <div>Podium History</div>
        </div>
      </div>
      <Bar options={config} data={data} />
    </div>
  )
}

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend)

function inLastMonth(date) {
  var currentDate = new Date()
  var daysAgo = new Date()
  daysAgo.setDate(currentDate.getDate() - 30)
  return date >= daysAgo && date <= currentDate
}
