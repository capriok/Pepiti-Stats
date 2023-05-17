import { useState } from 'react'
import Api from '~/api/api'
import Spinner from '~/components/Spinner'
import { Line } from 'react-chartjs-2'

export default async function LineChart({ guid }) {
  const riderMMRHistory = await Api.GetRiderMMRHistory(guid)
  const history = riderMMRHistory.history
  //   const [racesShown, setRacesShown] = useState(10)
  const racesShown = 10

  if (!history) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-full">
        <span>Loading MMR History...</span>
        <Spinner />
      </div>
    )
  }

  const filteredData = history.MMR_updates

  const totaledData = filteredData
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
    .slice(filteredData.length - racesShown)

  const labels = totaledData
    .map((_, idx) => {
      if (idx + 1 === 1) {
        return 'Prev race'
      }
      return idx + 1 + ' races ago'
    })
    .reverse()

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `MMR Updates`,
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total MMR',
        data: totaledData.map((update) => update),
        borderColor: '#37B24D',
        backgroundColor: 'rgba(55, 178, 77, 0.4)',
        lineTension: 0.1,
      },
    ],
  }

  //   const handleSetRacesShown = (adding: boolean) => {
  //     if (adding && racesShown < history.MMR_updates.length) {
  //       setRacesShown((prev) => prev + 1)
  //     } else if (!adding && racesShown > 3) {
  //       setRacesShown((prev) => prev - 1)
  //     }
  //   }

  return (
    <div className="bg-neutral-800/40 rounded-box w-full card card-body not-prose">
      <Line options={options} data={chartData} />
      <div className="mx-auto text-neutral-500 mt-10 w-full flex justify-between">
        <div>
          <p>Showing {racesShown} Races</p>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-sm rounded-r-none bg-neutral/50"
            // onClick={() => handleSetRacesShown(false)}
          >
            -
          </button>
          <button
            className="btn btn-sm rounded-l-none bg-neutral/50"
            // onClick={() => handleSetRacesShown(true)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
