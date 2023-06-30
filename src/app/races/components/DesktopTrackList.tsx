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
      <div className="sticky top-[65px] hidden max-h-screen w-full min-w-[320px] max-w-[320px] flex-col gap-2 overflow-y-auto lg:flex">
        <div className="flex flex-col bg-base-200 px-2 py-4">
          <p className="my-2 text-lg">{races.length} Recent Races</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search for Track..."
            className="input input-sm w-full  border border-accent/40"
          />
        </div>
        <div className="flex flex-col gap-2 px-2">
          {filteredRaceInfo.map((raceInfo) => {
            const isActive = raceId === raceInfo._id
            return (
              <Link
                key={raceInfo._id}
                href={`/races/${raceInfo._id}`}
                className={`group flex flex-col items-center justify-between rounded-lg border border-accent/20 px-2 py-2 hover:bg-primary/80 hover:text-white ${
                  isActive ? "bg-primary/80 py-3 text-white " : "bg-base-200"
                }`}
              >
                <div
                  className={`stat-desc flex w-full justify-end text-accent group-hover:text-white ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {raceInfo.by === "pep" ? (
                    isActive ? (
                      <Image
                        width={20}
                        height={20}
                        alt="by"
                        src="/assets/brand/white-flag.svg"
                        className="pr-1"
                      />
                    ) : (
                      <Image width={26} height={26} alt="by" src="/assets/brand/pepiti-p.svg" />
                    )
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
