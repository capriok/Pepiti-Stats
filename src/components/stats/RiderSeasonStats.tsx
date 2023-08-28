"use client"

import Pill from "~/components/pills/Pill"

interface Props {
  seasons: Array<LeagueSeason>
}

export default function RiderSeasonStats({ seasons }: Props) {
  if (!seasons?.length) return <></>

  const season = {
    name: "Summer 2023",
    MMR: seasons[0].MMR,
    position: seasons[0].position,
  }

  console.log("%cRiderSeasonStats", "color: steelblue", { seasons })

  return (
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
  )
}
