"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import Table from "~/ui/Table"
import { riderRecentRacesColumns, riderRecentRacesData } from "../data/riderRecentRaces"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function RiderRecentRacesTableRow({ row }) {
  const { data: raceData, isLoading } = useSWR(`/rider/${row._id}/races`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  return (
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s Last Ten Races
      </div>
      <Table data={riderRecentRacesData(raceData.races)} columns={riderRecentRacesColumns} />
    </>
  )
}
