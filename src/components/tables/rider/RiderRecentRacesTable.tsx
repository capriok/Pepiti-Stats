"use client"

import Link from "next/link"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import Table from "~/ui/Table"
import { dateIsValid } from "~/utils/dateIsValid"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"

export default function RiderRecentRacesTable({ races }) {
  const lastRaces = races.slice(0, 10)

  const data = lastRaces.map((race) => ({
    _id: race._id,
    date: parseInt(race._id.slice(0, 8), 16) * 1000,
    track: race.track,
    position: race?.Classification?.Pos ?? "",
    mmrGain: race.MMR.total,
    newMMR: race.MMR.old_MMR + race.MMR.total,
  }))
  console.log("%cRiderRecentRacesTable", "color: goldenrod", { races: data })

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
  return <Table data={data} columns={columns} rankEnabled={false} />
}
