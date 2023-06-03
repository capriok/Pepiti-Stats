"use client"

import Table from "~/components/Table/Table"
import RiderLink from "../RiderLink"
import BikeWithPrefixColor from "../pills/BikeWithPrefixColor"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"

interface Props {
  trackRecords: TrackRecord[]
}

export const TrackRecordsTable = ({ trackRecords }: Props) => {
  const data = trackRecords.map((r) => ({
    ...r,
    name: r.rider_name,
  }))
  console.log("%cTrackRecordsTable", "color: steelblue", { trackRecords: data })

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (name, row) => <RiderLink href={`/profile/${row.rider_guid}`}>{name}</RiderLink>,
    },
    {
      key: "lap_time",
      label: "Lap Time",
      render: (lapTime) => handleLapTimes(lapTime),
    },
    {
      key: "average_speed",
      label: "Avg Speed",
      render: (averageSpeed) => handleAverageSpeed(averageSpeed),
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
      key: "bike",
      label: "Bike",
      render: (bike) => <BikeWithPrefixColor bike={bike} />,
    },
  ]

  return (
    <Table
      data={data}
      columns={columns}
      searchEnabled={true}
      paginationEnabled={true}
      sortingEnabled={true}
      sortingKeys={["lap_time", "average_speed", "split_1", "split_2"]}
    />
  )
}
