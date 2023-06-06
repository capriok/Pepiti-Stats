"use client"

import Link from "next/link"
import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import Table from "~/components/Table/Table"
import { dateIsValid } from "~/utils/dateIsValid"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function MMRRecordsRiderRacesRow({ row }) {
  const { data: raceData, isLoading } = useSWR(`/rider/${row._id}/races`, fetcher)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )
  const lastRaces = raceData.races.slice(0, 10)

  const data = lastRaces.map((race) => ({
    _id: race._id,
    date: parseInt(race._id.slice(0, 8), 16) * 1000,
    track: race.track,
    position: race?.Classification?.Pos ?? "",
    mmrGain: race.MMR.total,
    newMMR: race.MMR.old_MMR + race.MMR.total,
  }))
  console.log("%cMMRRecordsRiderRacesRow", "color: goldenrod", { races: data })

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

  return (
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Last Ten Races
      </div>
      <Table data={data} columns={columns} rankEnabled={false} />
    </>
  )
}
