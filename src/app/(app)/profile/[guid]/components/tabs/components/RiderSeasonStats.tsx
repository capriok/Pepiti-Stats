"use client"

import { useState } from "react"
import Pill from "~/components/pills/Pill"

interface Props {
  seasons: Array<LeagueSeason>
}

export default function RiderSeasonStats({ seasons }: Props) {
  const [season, setSeason] = useState(seasons?.length ? seasons[0] : ({} as LeagueSeason))

  const seasonMocks = [
    {
      name: "Summer 2023",
      MMR: seasons[0].MMR,
      position: seasons[0].position,
    },
    {
      name: "Fall 2023",
      MMR: 0,
      position: 0,
    },
  ]

  if (!seasons?.length) return <></>

  console.log("%cRiderSeasonStats", "color: steelblue", { seasons })

  return (
    <>
      <div className="grid w-full place-items-center">
        <div className="my-4 whitespace-nowrap text-xl font-semibold">Seasons</div>
        <div className="flex w-full justify-center gap-2">
          {seasonMocks.map((season) => (
            <div
              key={season.name}
              className="cursor-pointer select-none"
              onClick={() => setSeason(season)}
            >
              <Pill text={season.name} color="secondary" />
            </div>
          ))}
        </div>
      </div>
      <div className="divider m-10" />
      <div className="w-full overflow-y-auto">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-col items-center">
            <div className="stat-title">Season</div>
            <div className="stat-value text-2xl">{season.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="w-full rounded-lg text-center">
              <div className="stat-title">Position</div>
              <div className="stat-value flex justify-center pt-2">
                <Pill text={season.position} color="info" />
              </div>
            </div>
            <div className="w-full rounded-lg text-center">
              <div className="stat-title">MMR</div>
              <div className="stat-value flex justify-center pt-2">
                <Pill text={season.MMR} color="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
