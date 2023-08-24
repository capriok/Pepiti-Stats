"use client"

import Table, { TableOptions } from "~/ui/Table"
import RiderLink from "~/components/RiderLink"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"

interface Props extends TableOptions {
  trackRecords: TrackRecord[]
}

export const TrackRecordsTable = ({ trackRecords, ...rest }: Props) => {
  const data = trackRecords.map((r) => ({
    ...r,
    name: r.rider_name,
  }))
  console.log("%cTrackRecordsTable", "color: steelblue", { trackRecords: data })

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (name, row, index) => (
        <div className={`${index < 3 ? "py-4" : ""} whitespace-nowrap`}>
          <RiderLink href={`/profile/${row.rider_guid}`} name={name} />
        </div>
      ),
    },
    {
      key: "lap_time",
      label: "Lap Time",
      render: (lapTime) => handleLapTimes(lapTime),
    },
    {
      key: "split_1",
      label: "Split 1",
      render: (split) => handleLapTimes(split),
    },
    {
      key: "split_2",
      label: "Split 2",
      render: (split) => handleLapTimes(split),
    },
    {
      key: "average_speed",
      label: "Avg Speed",
      render: (averageSpeed) => handleAverageSpeed(averageSpeed),
    },
    {
      key: "bike",
      label: "Bike",
      render: (bike) => (
        <div className="whitespace-nowrap">
          <BikeTicTac bike={bike} />
        </div>
      ),
    },
  ]

  const sortKeys = ["lap_time", "average_speed", "split_1", "split_2"]

  return (
    <Table
      data={data}
      columns={columns}
      searchEnabled={true}
      paginationEnabled={true}
      sortingEnabled={true}
      sortingKeys={sortKeys}
      {...rest}
    />
  )
}
