"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"
import RiderWorldRecordsTable from "../rider/RiderWorldRecordsTable"

export default function RiderWorldRecordsTableRow({ row }) {
  const { data: rider, isLoading } = useSWR(`/rider/${row._id}`)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )

  console.log("%cRiderWorldRecordsTableRow", "color: goldenrod", { rider: rider })

  return (
    <>
      <div className="mb-2 text-lg font-semibold">
        {handleRacismSanitization(row.name)}&apos;s World Records
      </div>
      <Tables rider={rider} />
    </>
  )
}

const Tables = ({ rider }) => {
  const { data: recordsData, isLoading } = useSWR(`/rider/${rider._id}/records`)

  if (isLoading)
    return (
      <div className="mb-4 mt-8">
        <Spinner />
      </div>
    )

  const worldRecords = recordsData.records.filter((record) => record.wr)

  return <RiderWorldRecordsTable records={worldRecords} paginationEnabled={true} />
}
