import Link from "next/link"
import React, { useState } from "react"
import RiderLink from "~/components/RiderLink"
import Table from "~/components/Table"
import { handleLapTimes } from "~/utils/handleLapTimes"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"

interface Props {
  standings: any
}

export default function RaceStandingsTable({ standings }: Props) {
  const tableColumns = [
    {
      key: "name",
      label: "Name",
      render: (name, row) => <RiderLink href={`/profile/${row._id}`}>{name}</RiderLink>,
    },
    {
      key: "raceNumber",
      label: "Race #",
      render: (raceNumber) => (
        <div className="flex gap-1">
          <div className="text-accent"># </div>
          <div className="text-primary">{raceNumber}</div>
        </div>
      ),
    },
    {
      key: "position",
      label: "Position",
      render: (position) =>
        position ? position ? <b>{handlePlaceSuffix(position)}</b> : "-" : "-",
    },
    {
      key: "gap",
      label: "Gap",
      render: (gap) => (gap ? handleLapTimes(gap) : "-"),
    },
    {
      key: "raceTime",
      label: "Race Time",
      render: (raceTime) => (raceTime ? handleLapTimes(raceTime) : "-"),
    },
    {
      key: "laps",
      label: "Laps",
      render: (laps) => (laps ? laps : "-"),
    },
    {
      key: "penalty",
      label: "Penalty",
      render: (penalty) => (penalty ? penalty + " s" : "-"),
    },
    {
      key: "fastestLap",
      label: "Fastest Lap",
      render: (fastestLap) => (fastestLap ? handleLapTimes(fastestLap) : "-"),
    },
  ]

  return (
    <>
      <Table columns={tableColumns} data={standings} />
    </>
  )
}
