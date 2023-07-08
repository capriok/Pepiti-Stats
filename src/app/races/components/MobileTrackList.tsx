"use client"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  races: Array<RecentRace>
}

export default function MobileTrackList({ races }: Props) {
  const router = useRouter()
  return (
    <div className="my-4 flex justify-center lg:hidden">
      <select
        onChange={(e) => router.push(`/races/${e.currentTarget.value}`)}
        className="select-bordered select mx-4 w-full bg-base-200"
      >
        {races.map((raceInfo) => (
          <option key={raceInfo._id} value={raceInfo._id}>
            {raceInfo.track}
          </option>
        ))}
      </select>
    </div>
  )
}
