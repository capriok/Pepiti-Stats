'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  races: Array<RecentRace>
}

export default function MobileTrackList({ races }: Props) {
  const router = useRouter()
  return (
    <div className="my-2 flex items-center justify-center py-2 lg:hidden">
      <select
        onChange={(e) => router.push(`/races/${e.currentTarget.value}`)}
        className="select-bordered select">
        {races.map((raceInfo) => (
          <option key={raceInfo._id} value={raceInfo._id}>
            {raceInfo.track}
          </option>
        ))}
      </select>
    </div>
  )
}
