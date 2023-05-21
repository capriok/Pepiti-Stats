'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
  races: Array<RecentRace>
}

export default function DesktopTrackList({ races }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const raceId = pathname.split('/')[2]
  const [search, setSearch] = useState('')

  const filteredRaceInfo = races.filter((raceInfo) =>
    raceInfo.track.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="sticky top-0 hidden max-h-screen w-full min-w-[300px] max-w-[300px] flex-col gap-2 overflow-y-auto bg-base-200 px-2 pb-3 lg:flex">
        <p className="my-2 flex justify-center text-lg">{races.length} Recent Races</p>
        <div className="mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search for Track..."
            className="input w-full"
          />
        </div>
        {filteredRaceInfo.map((raceInfo) => {
          const isActive = raceId === raceInfo._id
          return (
            <button
              onClick={() => router.push(`/races/${raceInfo._id}`)}
              key={raceInfo._id}
              className={`flex justify-between rounded-lg px-2 py-2 hover:bg-secondary/40 ${
                isActive ? 'text-md bg-secondary/60 py-3 text-white ' : 'bg-base-100'
              }`}>
              <div className="opacity-40">{raceInfo.by === 'pep' ? 'Pepiti' : raceInfo.by}</div>
              <div>{raceInfo.track}</div>
            </button>
          )
        })}
      </div>
    </>
  )
}
