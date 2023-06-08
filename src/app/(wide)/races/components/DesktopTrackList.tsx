"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { useState } from "react"

interface Props {
  races: Array<RecentRace>
}

export default function DesktopTrackList({ races }: Props) {
  const searchParams = useSearchParams()
  const trackParam = searchParams.get("track")
  const pathname = usePathname()
  const raceId = pathname.split("/")[2]
  const [search, setSearch] = useState(trackParam ?? "")

  const filteredRaceInfo = races.filter((raceInfo) =>
    raceInfo.track.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="sticky top-0 hidden max-h-screen w-full min-w-[300px] max-w-[300px] flex-col gap-2 overflow-y-auto lg:flex">
        <div className="bg-base-200 px-2 py-4">
          <p className="my-2 flex justify-center text-lg">{races.length} Recent Races</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search for Track..."
            className="input w-full"
          />
        </div>
        <div className="flex flex-col gap-2 px-2">
          {filteredRaceInfo.map((raceInfo) => {
            const isActive = raceId === raceInfo._id
            return (
              <Link
                key={raceInfo._id}
                href={`/races/${raceInfo._id}`}
                className={`group flex flex-col items-center justify-between rounded-lg px-2 py-2 hover:bg-secondary/80 hover:text-white ${
                  isActive ? "bg-secondary/80 py-3 text-white " : "bg-base-200"
                }`}
              >
                <div
                  className={`stat-desc flex w-full justify-end text-accent group-hover:text-white ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {raceInfo.by === "pep" ? (
                    <Image width={26} height={26} alt="by" src="/assets/brand/pepiti-p.svg" />
                  ) : (
                    raceInfo.by
                  )}
                </div>
                <div className="flex w-full">{raceInfo.track}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
