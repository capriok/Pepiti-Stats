"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/ui/Dropdown"
import Pill from "~/components/pills/Pill"

interface Props {
  seasonsList: Array<LeagueSeason>
}

export default function RiderSeasonStats({ seasonsList }: Props) {
  const seasons = seasonsList.map((s) => {
    let name = s.name.toLocaleLowerCase()

    if (name === "first season") name = "Summer 2023"
    if (name === "first autumn") name = "Autumn 2023"

    return { ...s, name }
  })

  const [season, setSeason] = useState(seasons[0])

  console.log("%cRiderSeasonStats", "color: steelblue", { seasons: seasons })

  if (!seasons?.length) return <></>

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex w-full flex-col justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="stat-title">Season</div>
          <SeasonDropdown seasons={seasons} season={season} setSeason={setSeason} />
        </div>
        <div className="grid w-full place-items-center">
          <div className="flex w-full flex-wrap gap-4 md:w-[80%] md:flex-nowrap">
            <div className="flex w-full flex-wrap justify-evenly md:justify-around">
              <div className="rounded-lg text-center">
                <div className="stat-title">Rank</div>
                <div className="stat-value flex justify-center pt-2">
                  <Pill text={season.position} color="info" className="min-w-[75px]" />
                </div>
              </div>
              <div className="rounded-lg text-center">
                <div className="stat-title">MMR</div>
                <div className="stat-value flex justify-center pt-2">
                  <Pill text={season.MMR} color="info" className="min-w-[75px]" />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap justify-evenly md:justify-around">
              <div className="rounded-lg text-center">
                <div className="stat-title">Races</div>
                <div className="stat-value flex justify-center pt-2">
                  <Pill text={season.races.total_races} color="info" className="min-w-[75px]" />
                </div>
              </div>
              <div className="rounded-lg text-center">
                <div className="stat-title">Fast Laps</div>
                <div className="stat-value flex justify-center pt-2">
                  <Pill text={season.races.fastlap} color="info" className="min-w-[75px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SeasonDropdown = ({ season, seasons, setSeason }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex select-none items-center gap-2">
        <div className="stat-value text-2xl">{season.name}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div>Seasons</div>
        </DropdownMenuLabel>
        {seasons?.map((s, i) => (
          <DropdownMenuItem
            key={i}
            className="min-w-[200px] capitalize"
            onClick={() => setSeason(s)}
          >
            {s.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
