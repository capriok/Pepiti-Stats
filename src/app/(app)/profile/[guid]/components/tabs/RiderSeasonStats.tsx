"use client"

import Pill from "~/components/pills/Pill"

interface Props {
  seasons: Array<LeagueSeason>
}

export default function RiderSeasonStats({ seasons }: Props) {
  console.log("%cRiderSeasonStats", "color: steelblue", { seasons })

  return (
    <div className="w-full p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">Seasonal Standings</div>
      {seasons.map((season, i) => (
        <div
          key={season.name + i}
          className={`flex flex-col justify-center gap-2 ${
            i > 0 ? "mt-8 border-t-2 border-accent/10 pt-8" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="stat-title">Season</div>
            <div className="stat-value text-2xl">
              {season.name === "First summer" ? "Summer 2023" : season.name}
            </div>
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
      ))}
    </div>
  )
}
