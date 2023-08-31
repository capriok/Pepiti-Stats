"use client"

import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
import MMRPill from "~/components/pills/MMRPill"
import Table, { TableOptions } from "~/ui/Table"
import Pill from "~/components/pills/Pill"
import Link from "next/link"
import { handleRaceGap } from "~/utils/handleRaceGap"

interface Props extends TableOptions {
  races: Array<any>
  columns: any
}

export default function RiderRacesTable({ races, columns, ...rest }: Props) {
  const data = races.map((race) => ({
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

  console.log("%cRiderRacesTable", "color: steelblue", { records: data })

  return (
    <Table data={data} columns={columns} rankEnabled={false} paginationEnabled={true} {...rest} />
  )
}

export const riderRacesColumns = [
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
    render: (gap) => (gap !== undefined ? handleRaceGap(gap) : "-"),
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

export const riderRacesColumnsWithControls = [
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
    onFilter: (value, row) => row.track.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "position",
    label: "Position",
    render: (position) => (position ? <b>{handlePlaceSuffix(position)}</b> : "-"),
  },
  {
    key: "gap",
    label: "Gap",
    render: (gap) => (gap !== undefined ? handleRaceGap(gap) : "-"),
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
