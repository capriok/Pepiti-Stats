"use client"

import useSWR from "swr"
import Spinner from "~/components/Spinner"
import RiderPersonalRecordsTable from "~/components/tables/rider/RiderPersonalRecordsTable"
import RiderWorldRecordsTable from "~/components/tables/rider/RiderWorldRecordsTable"
import RiderWorldRecordStats from "~/components/stats/RiderWorldRecordStats"

interface Props {
  rider: RiderProfile
}

export default function RecordsTab({ rider }: Props) {
  return (
    <div className="p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">World Record Stats</div>
      <div className="mb-4">
        <RiderWorldRecordStats rider={rider} />
      </div>
      <Tables rider={rider} />
    </div>
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
  const personalRecords = recordsData.records.filter((record) => !record.wr)

  return (
    <>
      {worldRecords.length ? (
        <>
          <div className="mb-4 mt-8 whitespace-nowrap text-xl font-semibold">World Records</div>
          <RiderWorldRecordsTable records={worldRecords} paginationEnabled={true} />
        </>
      ) : (
        <> </>
      )}
      <div className="mb-4 mt-8 whitespace-nowrap text-xl font-semibold">Personal Records</div>
      <RiderPersonalRecordsTable
        records={personalRecords}
        paginationEnabled={true} 
      />
    </>
  )
}
