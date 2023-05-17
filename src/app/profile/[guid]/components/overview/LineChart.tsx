'use client'

import { useState } from 'react'
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
} from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function LineChart({ historyData }) {
  const [limit, setLimit] = useState(20)

  const totaledData = historyData
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
    .slice(historyData.length - limit)

  const labels = totaledData
    .map((_, idx) => {
      if (idx + 1 === 1) {
        return 'Prev race'
      }
      return idx + 1 + ' races ago'
    })
    .reverse()

  const data = {
    labels,
    datasets: [
      {
        label: 'Total MMR',
        data: totaledData,
        borderColor: '#37B24D',
        backgroundColor: 'rgba(55, 178, 77, 0.4)',
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
    <div className="bg-base-200 rounded-box w-full card card-body p-4 pt-0">
      <div className="flex gap-2 text-lg my-4 font-semibold">
        <div>MMR History:</div>
      </div>
      <Line options={options} data={data} />
      <div className="mx-auto mt-4 w-full flex justify-between">
        <div className="text-neutral-400">Showing {limit} Races</div>
        <div className="btn-group">
          <button
            className="btn btn-sm hover:bg-secondary/60  rounded-r-none bg-base-100 border-none"
            onClick={() => setLimit((l) => (l > 5 ? l - 1 : l))}>
            -
          </button>
          <button
            className="btn btn-sm  hover:bg-secondary/60 rounded-l-none bg-base-100 border-none"
            onClick={() => setLimit((l) => (l < historyData.length ? l + 1 : l))}>
            +
          </button>
        </div>
      </div>
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
