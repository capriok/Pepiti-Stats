'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
  races: Array<RecentRace>
}

export default function DesktopTrackList({ races }: Props) {
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
            <Link
              key={raceInfo._id}
              href={`/races/${raceInfo._id}`}
              className={`group flex items-center justify-between rounded-lg px-2 py-2 hover:bg-secondary/80 hover:text-white ${
                isActive ? 'bg-secondary/80 py-3 text-white ' : 'bg-base-100'
              }`}>
              <div className={`stat-desc group-hover:text-white ${isActive ? 'text-white' : ''}`}>
                {raceInfo.by === 'pep' ? 'Pepiti' : raceInfo.by}
              </div>
              <div className="text-right">{raceInfo.track}</div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
