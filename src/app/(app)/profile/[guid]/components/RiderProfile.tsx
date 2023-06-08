"use client"

import RiderAvatar from "./RiderAvatar"
import ProfileTabs from "./ProfileTabs"
import AdminControls from "./AdminControls"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import { createContext, useContext } from "react"

interface Props {
  user: User
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
}

export const RiderProfile = ({ user, rider, mmrHistory }: Props) => {
  console.log("%cRider Profile", "color: steelblue", { rider })

  return (
    <>
      <div className="w-full">
        <AdminControls user={user} rider={rider} />
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-10">
          <div className="md:mt-0flex mt-10 w-full flex-1 justify-center">
            <RiderAvatar rider={rider} />
          </div>
          <div className="w-full overflow-hidden lg:w-3/4">
            <div className="pb-2 text-lg font-semibold">Rider Stats</div>
            <RiderStats rider={rider} />
            <div className="pb-2 text-lg font-semibold">Race Stats</div>
            <RaceStats rider={rider} />
          </div>
        </div>
      </div>
      <ProfileTabs user={user} rider={rider} mmrHistory={mmrHistory} />
    </>
  )
}

const RiderStats = ({ rider }: { rider: RiderProfile }) => {
  return (
    <div className="stats mb-10 w-full bg-base-200 shadow-md">
      <div className="stat">
        <div className="stat-title">MMR</div>
        <div className="stat-value py-2 text-2xl">{rider.MMR}</div>
        <div className="stat-desc">Matchmaking rating</div>
      </div>
      <div className="stat">
        <div className="stat-title">SR</div>
        <div className={`stat-value py-2 text-2xl ${rider.SR < 950 && " text-error"}`}>
          {rider.SR}
        </div>
        <div className="stat-desc">Safety rating</div>
      </div>
      <div className="stat">
        <div className="stat-title">Contacts</div>
        <div className="stat-value py-2 text-2xl">{rider.contact}</div>
        <div className="stat-desc">Stay in your lane</div>
      </div>
      <div className="stat">
        <div className="stat-title">Laps</div>
        <div className="stat-value py-2 text-2xl">{rider.total_laps}</div>
        <div className="stat-desc">Finish lines jumped</div>
      </div>
      <div className="stat">
        <div className="stat-title">Speed</div>
        <div className="stat-value py-2 text-2xl">
          {rider.average_speed ? handleAverageSpeed(rider.average_speed, false) : "-"}
        </div>
        <div className="stat-desc">Miles per Hour</div>
      </div>
      <div className="stat">
        <div className="stat-title">Favorite Bike</div>
        <div className="stat-value py-2 text-2xl">{rider.favorite_bike.laps} Laps</div>
        <div className="stat-desc">{rider.favorite_bike.name}</div>
      </div>
    </div>
  )
}

const RaceStats = ({ rider }: { rider: RiderProfile }) => {
  return (
    <div className="stats w-full bg-base-200 shadow-md">
      <div className="stat">
        <div className="stat-title">First</div>
        <div className="stat-value py-2 text-2xl">{rider.races.first}</div>
        <div className="stat-desc">The winner circle</div>
      </div>
      <div className="stat">
        <div className="stat-title">Second</div>
        <div className={`stat-value py-2 text-2xl`}>{rider.races.second}</div>
        <div className="stat-desc">The second best</div>
      </div>
      <div className="stat">
        <div className="stat-title">Third</div>
        <div className="stat-value py-2 text-2xl">{rider.races.third}</div>
        <div className="stat-desc">Best of the rest</div>
      </div>
      <div className="stat">
        <div className="stat-title">Races</div>
        <div className="stat-value py-2 text-2xl">{rider.races.total_races}</div>
        <div className="stat-desc">Total gate drops</div>
      </div>
      <div className="stat">
        <div className="stat-title">Fastest Laps</div>
        <div className="stat-value py-2 text-2xl">{rider.races.fastlap}</div>
        <div className="stat-desc">Just sending it</div>
      </div>
      <div className="stat">
        <div className="stat-title">Holeshots</div>
        <div className="stat-value py-2 text-2xl">{rider.races.holeshot}</div>
        <div className="stat-desc">Wide open right away</div>
      </div>
    </div>
  )
}
