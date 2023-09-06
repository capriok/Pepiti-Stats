"use client"

import AdminControls from "./AdminControls"
import RiderAvatar from "./RiderAvatar"
import ProfileTabs from "./ProfileTabs"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"

interface Props {
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
}

export const RiderProfile = ({ rider, mmrHistory }: Props) => {
  console.log("%cRider Profile", "color: steelblue", { rider })

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-10">
          <div className="mt-10 flex w-full flex-1 justify-center md:mt-0">
            <RiderAvatar rider={rider} />
          </div>
          <div className="w-full overflow-hidden lg:w-3/4">
            <div className="pb-2 text-lg font-semibold">Rider Stats</div>
            <RiderStats rider={rider} />
            <div className="pb-2 text-lg font-semibold">Overall Stats</div>
            <OverallStats rider={rider} />
          </div>
        </div>
      </div>
      <ProfileTabs rider={rider} mmrHistory={mmrHistory} />
    </>
  )
}

const RiderStats = ({ rider }: { rider: RiderProfile }) => {
  const overallMMR = rider.seasons.reduce((acc, curr) => acc + curr.MMR, 0)

  return (
    <div className="stats mb-10 w-full rounded-md border border-accent/40 bg-base-200 shadow-md">
      <div className="stat">
        <div className="stat-title">MMR</div>
        <div className="stat-value py-1 text-2xl">{overallMMR}</div>
        <div className="stat-desc">Matchmaking rating</div>
      </div>
      <div className="stat">
        <div className="stat-title">SR</div>
        <div className={`stat-value py-1 text-2xl ${rider.SR < 950 && " text-error"}`}>
          {rider.SR}
        </div>
        <div className="stat-desc">Safety rating</div>
      </div>
      <div className="stat">
        <div className="stat-title">Contacts</div>
        <div className="stat-value py-1 text-2xl">{rider.contact}</div>
        <div className="stat-desc">Stay in your lane</div>
      </div>
      <div className="stat">
        <div className="stat-title">Speed</div>
        <div className="stat-value py-1 text-2xl">
          {rider.average_speed ? handleAverageSpeed(rider.average_speed, false) : "-"}
        </div>
        <div className="stat-desc">Average mph</div>
      </div>
      <div className="stat">
        <div className="stat-title">Favorite Bike</div>
        <div className="stat-value py-1 text-2xl">{rider.favorite_bike.laps} Laps</div>
        <div className="stat-desc">{rider.favorite_bike.name}</div>
      </div>
    </div>
  )
}

const OverallStats = ({ rider }: { rider: RiderProfile }) => {
  const overallTotalRaces = rider.seasons.reduce((acc, curr) => acc + curr.races.total_races, 0)
  const overallFastestLaps = rider.seasons.reduce((acc, curr) => acc + curr.races.fastlap, 0)
  const overallHoleshots = rider.seasons.reduce((acc, curr) => acc + curr.races.holeshot, 0)

  return (
    <div className="stats w-full rounded-md border border-accent/40 bg-base-200 shadow-md">
      <div className="stat">
        <div className="stat-title">Records</div>
        <div className="stat-value py-1 text-2xl">{rider.world_records.total}</div>
        <div className="stat-desc">World Records</div>
      </div>
      <div className="stat">
        <div className="stat-title">Races</div>
        <div className="stat-value py-1 text-2xl">{overallTotalRaces}</div>
        <div className="stat-desc">Gate drops</div>
      </div>
      <div className="stat">
        <div className="stat-title">Laps</div>
        <div className="stat-value py-1 text-2xl">{rider.total_laps}</div>
        <div className="stat-desc">Finish lines jumped</div>
      </div>
      <div className="stat">
        <div className="stat-title">Fastest Laps</div>
        <div className="stat-value py-1 text-2xl">{overallFastestLaps}</div>
        <div className="stat-desc">Just sending it</div>
      </div>
      <div className="stat">
        <div className="stat-title">Holeshots</div>
        <div className="stat-value py-1 text-2xl">{overallHoleshots}</div>
        <div className="stat-desc">Wide open right away</div>
      </div>
    </div>
  )
}
