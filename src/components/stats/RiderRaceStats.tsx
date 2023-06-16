"use client"

export default function RiderRaceStats({ rider }) {
  return (
    <div className="stats flex w-full bg-base-100/60 text-center shadow-md dark:bg-base-100">
      <div className="stat w-full text-center">
        <div className="stat-title">First</div>
        <div className="stat-value pt-2 text-2xl">{rider.races.first.toLocaleString()}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Second</div>
        <div className="stat-value pt-2 text-2xl">{rider.races.second.toLocaleString()}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Third</div>
        <div className="stat-value pt-2 text-2xl">{rider.races.third.toLocaleString()}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Races</div>
        <div className="stat-value pt-2 text-2xl">{rider.races.total_races.toLocaleString()}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Fastest Laps</div>
        <div className="stat-value pt-2 text-2xl">{rider.races.fastlap.toLocaleString()}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Holeshots</div>
        <div className="stat-value pt-2 text-2xl">{rider.races.holeshot.toLocaleString()}</div>
      </div>
    </div>
  )
}
