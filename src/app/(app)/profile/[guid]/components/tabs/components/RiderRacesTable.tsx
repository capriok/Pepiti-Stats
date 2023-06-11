"use client"

import useSWR from "swr"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
import MMRPill from "~/components/pills/MMRPill"
import Table from "~/ui/Table"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import Link from "next/link"

interface Props {
  guid: string
}

export default function RiderRacesTable({ guid }: Props) {
  const { data: raceData, isLoading } = useSWR(`/rider/${guid}/races`)

  if (isLoading)
    return (
      <div className="my-5">
        <Spinner />
      </div>
    )
  console.log("%cRiderRacesTable", "color: steelblue", { records: raceData.races })

  const data = raceData.races.map((race) => ({
    date: parseInt(race._id.slice(0, 8), 16) * 1000,
    _id: race._id,
    track: race.track,
    position: race?.Classification?.Pos ?? "",
    laps: race?.Classification?.Laps ?? "",
    gap: race?.Classification?.Gap ?? "",
    penalties: race?.Classification?.Penalty ?? "",
    fastestLap: race.FastestLap,
    mmrGain: race.MMR.total,
    newMMR: race.MMR.old_MMR + race.MMR.total,
  }))

  const columns = [
    {
      key: "date",
      label: "Date",
      render: (date) => (dateIsValid(new Date(date)) ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      key: "track",
      label: "Track",
      render: (track, row) => (
        <Link href={`/races/${row._id}`} className="font-semibold text-primary/80">
          {track ? track : "-"}
        </Link>
      ),
    },
    {
      key: "position",
      label: "Position",
      render: (position) => (position ? <b>{handlePlaceSuffix(position)}</b> : "-"),
    },
    {
      key: "gap",
      label: "Gap",
      render: (gap) => (gap ? handleLapTimes(gap) : "-"),
    },
    {
      key: "laps",
      label: "Laps",
      render: (laps) => (laps ? laps : "-"),
    },
    {
      key: "penalties",
      label: "Penalties",
      render: (penalties) => (penalties ? penalties + " s" : "-"),
    },
    {
      key: "fastestLap",
      label: "Fastest Lap",
      render: (fastestLap) => (fastestLap ? handleLapTimes(fastestLap) : "-"),
    },
    {
      key: "mmrGain",
      label: "MMR +/-",
      render: (mmrGain) => <MMRPill mmr={mmrGain} />,
    },
    {
      key: "newMMR",
      label: "New MMR",
      render: (newMMR) => <Pill text={newMMR} />,
    },
  ]

  const sortKeys = ["date", "track", "position", "gap", "laps", "penalties", "mmrGain", "newMMR"]

  return (
    <Table
      columns={columns}
      data={data}
      searchKey="track"
      rankEnabled={false}
      searchEnabled={true}
      paginationEnabled={true}
      sortingEnabled={true}
      sortingKeys={sortKeys}
    />
  )
}